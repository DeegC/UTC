#!/bin/bash

if id -u dgc; then
    echo "User exists"
else
    adduser dgc
    usermod -aG sudo dgc
    echo "AllowUsers dgc" >> /etc/ssh/sshd_config
    service ssh reload
fi

# Don't allow root to ssh into server.
sed -i "s/PermitRootLogin yes/PermitRootLogin no/g" /etc/ssh/sshd_config

if [ ! -f /etc/apt/sources.list.d/webupd8team-java.list ]; then
    echo "deb http://ppa.launchpad.net/webupd8team/java/ubuntu xenial main" > /etc/apt/sources.list.d/webupd8team-java.list
    echo "deb-src http://ppa.launchpad.net/webupd8team/java/ubuntu xenial main" >> /etc/apt/sources.list.d/webupd8team-java.list
fi

# Don't run update if there is an argument.  Saves time on retries.
if [ -z "$1" ]; then
    apt-get update
fi

apt-get install ssmtp mailutils vim oracle-java8-installer git x11vnc emacs ruby htop wireless-tools screen gcc make
#apt-get install mysql-server

# Add a script to send an email with the local IP whenever a network connection is made.
if [ ! -f /etc/network/if-up.d/send-ip ]; then
    echo "#!/bin/sh" > /etc/network/if-up.d/send-ip
    echo "ip addr show wlan0  | mail -s\"Chip IP\" dgc@dgchristensen.net" >> /etc/network/if-up.d/send-ip
    chmod +x /etc/network/if-up.d/send-ip
fi

