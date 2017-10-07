#!/bin/bash

# Used to set up dev environment for UTC.  Run on the CHIP as root.
if [ "$(whoami)" != "root" ]; then
    echo "Run as root"
    exit 1
fi

if [ -z "$1" ]; then
    echo "Dev user must be first argument"
    exit 1
fi

user=$1

# Determine the CHIP bin
SCRIPTPATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
CHIPBIN=$SCRIPTPATH/../bin/chip
SERVERBIN=$SCRIPTPATH/../server

reboot=0

if id -u $user; then
    echo "User exists"
else
    adduser $user
    usermod -aG sudo $user
    echo "AllowUsers $user" >> /etc/ssh/sshd_config
    service ssh reload
fi

# Don't allow root to ssh into server.  This disallows chip user from logging in remotely.
sed -i "s/PermitRootLogin yes/PermitRootLogin no/g" /etc/ssh/sshd_config

# Add Oracle Java 8 ppa.  We need Oracle Java 8 for ARM for performance reasons.
if [ ! -f /etc/apt/sources.list.d/webupd8team-java.list ]; then
    echo "deb http://ppa.launchpad.net/webupd8team/java/ubuntu xenial main
deb-src http://ppa.launchpad.net/webupd8team/java/ubuntu xenial main" > /etc/apt/sources.list.d/webupd8team-java.list
    apt-get update
fi

# Check to see if node.js is installed.
if ! which node; then
    # Add node.js to the list of repositories.
    curl -sL https://deb.nodesource.com/setup_7.x | bash -
fi

apt-get install ssmtp mailutils vim oracle-java8-installer git x11vnc emacs ruby htop wireless-tools screen gcc make nodejs device-tree-compiler

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
    cat utc-init | sed -e "s|CHIPBIN|$CHIPBIN|g" -e "s|SERVERBIN|$SERVERBIN|g" > /etc/init.d/utc-init
    chmod 755 /etc/init.d/utc-init
    update-rc.d utc-init defaults
fi

# Add a script to send an email with the local IP whenever a network connection is made.
maildir=/etc/NetworkManager/dispatcher.d
#maildir=/etc/network/if-up.d
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
    $CHIPBIN/set-led yellow on
fi

if [ "\$2" = "down" ]; then
    $CHIPBIN/set-led yellow off
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
