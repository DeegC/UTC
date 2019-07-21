#!/bin/sh

# Installs UTC from scratch.

set -e   # Exit on any error

if [ "$(whoami)" != "root" ]; then
    echo "Run with: sudo ./install-utc.sh"
    exit 1
fi

if [ -f utc.config ]; then
    echo "Loading utc.config"
    . utc.config
fi

# For now we'll just assume we're on a RPi.  In the future we'll use 'uname -a' to determine
# what env we're on.
arch='rpi'
user='utc'
hostname utc

if ! id -u "$user" > /dev/null; then
    adduser --system --shell /bin/bash $user
    adduser $user netdev

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
fi

# If DEV_USER defined add the user and some development tools.
if [ ! -z "$DEV_USER" ]; then
    if ! id -u "$DEV_USER" > /dev/null; then
        echo "Adding user $DEV_USER..."
        useradd $DEV_USER -s /bin/bash -m  -G sudo
        if [ ! -z "$DEV_USER_PASSWORD" ]; then
            echo "$DEV_USER:$DEV_USER_PASSWORD" | chpasswd
        fi
        apt install vim git x11vnc ruby htop mlocate sqlite3
    fi
fi

if [ "$arch" = "rpi" ]; then
    # Install Adafruit pip code to access the MCP3008 chip
    echo "Installing adafruit-mcp3008"
    pip install adafruit-mcp3008
fi

# Add Oracle Java 8 ppa.  We need Oracle Java 8 for ARM for performance reasons.
if [ ! -f /etc/apt/sources.list.d/webupd8team-java.list ]; then
    echo "Installing Java 8"
    apt install software-properties-common
    add-apt-repository ppa:webupd8team/java
    apt-get update
    apt install oracle-java8-installer
fi

DEB_FILE=utc_1.1-1_all.deb
if [ ! -f $DEB_FILE ]; then
    echo "Downloading .deb file"
    wget -q --auth-no-challenge --header='Accept:application/octet-stream' \
        https://api.github.com/repos/DeegC/UTC/releases/assets/13783892 -O $DEB_FILE

    dpkg -i $DEB_FILE
fi

# If specified, then set up smtp to email the IP address via gmail.
if [ -n "$GMAIL_EMAIL_RECIPIENT" ]; then
    if [ -z "$GMAIL_ACCOUNT" ]; then
        echo "GMAIL_ACCOUNT needs to be set to the gmail account name."
        exit 1
    fi

    if [ -z "$GMAIL_PASSWORD" ]; then
        echo "GMAIL_PASSWORD needs to be set"
        exit 1
    fi

    echo "Installing GMail notification for $GMAIL"
    sudo apt-get install ssmtp mailutils

    echo "# Set up smtp to send email via gmail.
root=$GMAIL_EMAIL_RECIPIENT
mailhub=smtp.gmail.com:587
hostname=utc
FromLineOverride=YES
AuthUser=$GMAIL_ACCOUNT
AuthPass=$GMAIL_PASSWORD
UseSTARTTLS=YES" > /etc/ssmtp/ssmtp.conf

    # Set up script to send email when network is up.
    echo "#!/bin/sh
send-mail(){
    sleep 20
    ip addr show wlan0  | mail -s\"RPi IP\" $GMAIL_EMAIL_IP
}
send-mail &" > /etc/network/if-up.d/send-ip
    chmod +x /etc/network/if-up.d/send-ip
fi

if echo "$BLUETOOTH" | grep -iq "^[yt1]"; then
    if which bluetoothctl > /dev/null; then
        echo "Installing bluetooth"
        apt install bluez
    fi

    echo "We will now try to pair with your phone.  Make sure BT is on and discoverable."
    echo "Execute the following once bluetoothctl starts: "
    echo "      scan on"
    echo "      trust <MAC ADDR>"
    echo "      pair <MAC ADDR>"
    echo "      exit"

    bluetoothctl
fi
