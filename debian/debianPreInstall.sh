#!/bin/sh

user=utc

adduser --system $user
adduser $user netdev

# For now we'll just assume we're on a RPi.  In the future we'll use 'uname -a' to determine
# what env we're on.
arch='rpi'

if [ "$arch" = "rpi" ]; then
    # RPi groups
    adduser $user gpio
    adduser $user i2c
    adduser $user spi
fi

if [ "$arch" = "chip" ]; then
    # On CHIP the user must have sudo authority.
    usermod -aG sudo $user
fi

# Let java apps access port 80
sudo setcap CAP_NET_BIND_SERVICE=+eip $(readlink -f $(which java))
