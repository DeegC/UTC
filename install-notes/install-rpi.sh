#!/bin/bash

NOT COMPLETELY FINISHED CONVERTING FROM CHIP TO RPI

# Used to set up dev environment for UTC.  Run on the RPi as root.
if [ "$(whoami)" != "root" ]; then
    echo "Run as root"
    exit 1
fi

if [ -z "$1" ]; then
    echo "Dev user must be first argument"
    exit 1
fi

user=$1

# Determine the RPI bin
SCRIPTPATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
RPIBIN=$SCRIPTPATH/../bin/rpi
SERVERBIN=$SCRIPTPATH/../bin

reboot=0

if id -u $user; then
    echo "User exists"
else
    adduser $user
    usermod -aG sudo $user
    echo "AllowUsers $user" >> /etc/ssh/sshd_config
    service ssh reload
fi

apt-get install ssmtp mailutils vim at #oracle-java8-installer git x11vnc emacs ruby htop wireless-tools screen gcc make nodejs device-tree-compiler sqlite3
apt-get install dirmngr --install-recommends


# Add Oracle Java 8 ppa.  We need Oracle Java 8 for ARM for performance reasons.
if [ ! -f /etc/apt/sources.list.d/webupd8team-java.list ]; then
    echo "deb http://ppa.launchpad.net/webupd8team/java/ubuntu xenial main" > /etc/apt/sources.list.d/webupd8team-java.list
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys EEA14886
    apt-get update
    apt-get install oracle-java8-installer
fi

# Install file into device-tree to enable SPI support in the CHIP
# Add lines to /etc/rc.local if they don't currently exist.
if [[ -z $(grep overlays/spi /etc/rc.local) ]]; then
    echo "Adding SPI to rc.local"
    sed -i '/^exit 0/d' /etc/rc.local  # Remove the exit.  We'll re-add it below.
    echo "
mkdir -p /sys/kernel/config/device-tree/overlays/spi
cat /lib/firmware/nextthingco/chip/sample-spi.dtbo > /sys/kernel/config/device-tree/overlays/spi/dtbo
exit 0
" >> /etc/rc.local
fi

# Set up PWM.  Pulled from https://gist.github.com/ugate/392185a959737365834f54d5bf4aae5b
if ! find /sys/class/pwm/pwmchip0 2> /dev/null; then
    cp /boot/sun5i-r8-chip.dtb /boot/sun5i-r8-chip.dtb.bak.$(date -d "today" +"%Y%m%d%H%M")
    fdtput -t s /boot/sun5i-r8-chip.dtb "/soc@01c00000/pwm@01c20e00" "status" "okay"
    fdtput -t s /boot/sun5i-r8-chip.dtb "/soc@01c00000/pwm@01c20e00" "pinctrl-names" "default"
    fdtput -t x /boot/sun5i-r8-chip.dtb "/soc@01c00000/pwm@01c20e00" "pinctrl-0" "0x67" # 0x63 for older v4.4
    reboot=1
fi

if [ ! -f /etc/init.d/utc-init ]; then
    echo "Installing utc-init"
    cat utc-init | sed -e "s|RPIBIN|$RPIBIN|g" -e "s|SERVERBIN|$SERVERBIN|g" > /etc/init.d/utc-init
    chmod 755 /etc/init.d/utc-init
    update-rc.d utc-init defaults
fi

# Add a script to send an email with the local IP whenever a network connection is made.
maildir=/etc/network/if-up.d
if [ ! -f $maildir/send-ip ]; then
    echo "Enter email address to receive notification of CHIP IP address every time it starts."
    read -p "Use a blank value to indicate you don't want email" emailaddress
    if [ ! -z "$emailaddress" ]; then
	cat > $maildir/send-ip <<EOF
#!/bin/sh
# \$1 = interface name
# \$2 = action: up/down (and others)

if [ "\$2" = "up" ]; then
    ip addr show wlan0  | mail -s"Chip IP" $emailaddress
    $RPIBIN/set-led yellow on
fi

if [ "\$2" = "down" ]; then
    $RPIBIN/set-led yellow off
fi

EOF
	chmod +x $maildir/send-ip
	echo "Email script added to $maildir/send-ip.  Note that you may still have to install an email server."
    fi
fi

# Additional notes:

# Run this if language isn't set properly:
#sudo locale-gen en_US en_US.UTF-8 && sudo dpkg-reconfigure locales

if [ "$reboot" = "1" ]; then
    echo You must reboot the system.
fi
