user=utc

adduser $user
adduser $user netdev

# RPi groups
adduser $user gpio
adduser $user i2c
adduser $user spi

if [ "$arch" == "chip" ]; then
    # On CHIP the user must have sudo authority.
    usermod -aG sudo $user
fi
