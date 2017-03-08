#!/bin/bash

# Used to set up dev environment for UTC.  Run on the CHIP as root.

if id -u dgc; then
    echo "User exists"
else
    adduser dgc
    usermod -aG sudo dgc
    echo "AllowUsers dgc" >> /etc/ssh/sshd_config
    service ssh reload
fi

# Don't allow root to ssh into server.  This disallows chip user from logging in.
sed -i "s/PermitRootLogin yes/PermitRootLogin no/g" /etc/ssh/sshd_config

# Install Oracle Java 8 ppa.  We need Oracle Java 8 for ARM for performance reasons.
if [ ! -f /etc/apt/sources.list.d/webupd8team-java.list ]; then
    echo "deb http://ppa.launchpad.net/webupd8team/java/ubuntu xenial main" > /etc/apt/sources.list.d/webupd8team-java.list
    echo "deb-src http://ppa.launchpad.net/webupd8team/java/ubuntu xenial main" >> /etc/apt/sources.list.d/webupd8team-java.list
fi

# Don't run update if there is an argument.  Saves time on retries.
if [ -z "$1" ]; then
    apt-get update
fi

# Check to see if node.js is installed.
if ! which node; then
    # Add node.js to the list of repositories.
    curl -sL https://deb.nodesource.com/setup_7.x | bash -
fi

apt-get install ssmtp mailutils vim oracle-java8-installer git x11vnc emacs ruby htop wireless-tools screen gcc make nodejs

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

# Add a script to send an email with the local IP whenever a network connection is made.
if [ ! -f /etc/network/if-up.d/send-ip ]; then
    echo "#!/bin/sh" > /etc/network/if-up.d/send-ip
    echo "ip addr show wlan0  | mail -s\"Chip IP\" dgc@dgchristensen.net" >> /etc/network/if-up.d/send-ip
    chmod +x /etc/network/if-up.d/send-ip
fi



# Additional notes:

# Run this if language isn't set properly:
#sudo locale-gen en_US en_US.UTF-8 && sudo dpkg-reconfigure locales
