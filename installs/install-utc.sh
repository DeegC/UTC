#!/bin/bash

# Installs UTC from scratch.

set -e   # Exit on any error

if [ "$(whoami)" != "root" ]; then
    echo "Run with: sudo ./install-utc.sh"
    exit 1
fi

if [ -f utc.config ]; then
    echo "Loading utc.config"
    . ./utc.config
fi

# For now we'll just assume we're on a RPi.  In the future we'll use 'uname -a' to determine
# what env we're on.
arch='rpi'
user='utc'

current_hostname=$(hostname)
if [ ! -z "$UTC_HOSTNAME" ] && [ "$current_hostname" != "$UTC_HOSTNAME" ]; then
    hostname $UTC_HOSTNAME
    echo "$UTC_HOSTNAME" > /etc/hostname
    sed -i "s/$current_hostname/$UTC_HOSTNAME/" /etc/hosts
fi

if ! id -u "$user" &> /dev/null; then
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
    if ! id -u "$DEV_USER" &> /dev/null; then
        echo "Adding user $DEV_USER..."
        useradd $DEV_USER -s /bin/bash -m  -G sudo
        if [ ! -z "$DEV_USER_PASSWORD" ]; then
            echo "$DEV_USER:$DEV_USER_PASSWORD" | chpasswd
        fi
	apt update
        apt install --assume-yes vim git x11vnc ruby htop mlocate sqlite3

	read -p "Disable user pi user from ssh? (yes/no) : " yesno
	if [[ "$yesno" = y* ]]; then
	    echo "Disabling pi from ssh"
	    echo "DenyUsers pi" >> /etc/ssh/sshd_config
	fi
    fi
fi

echo "Checking for adafruit-mcp3008..."
if ! pip list | grep -i adafruit-mcp3008 > /dev/null; then
    # Install Adafruit pip code to access the MCP3008 chip
    echo "Installing adafruit-mcp3008"
    pip install adafruit-mcp3008
fi

# Make sure pigpiod is started with sockets on.
if grep -q "pigpiod -l" /lib/systemd/system/pigpiod.service; then
    sed -i 's/pigpiod -l/pigpiod/' /lib/systemd/system/pigpiod.service
    systemctl daemon-reload
fi

if [ -f .tar ]; then
    tarfile=...get full path...
    pushd /usr/lib/jvm > /dev/null
    tar xvf $tarfile
    update-alternatives --install /usr/bin/java java /usr/lib/jvm/jdk1.8.0_221/bin/java 1
    update-alternatives --set java /usr/lib/jvm/jdk1.8.0_221/bin/java
    popd > /dev/null
fi

# Check to see if java runs.  If no, then install java 8
if ! java -version &> /dev/null; then
    echo "Installing Java 8"
    apt install --assume-yes openjdk-8-jre-headless openjdk-8-jre
    echo ""
    echo " --"
    echo " -- Choose Java 8"
    echo " --"
    echo ""
    update-alternatives --config java
fi

DEB_FILE=utc_1.1-1_all.deb
if [ ! -f $DEB_FILE ]; then
    echo "Downloading .deb file"
    wget -q --auth-no-challenge --header='Accept:application/octet-stream' \
        https://github.com/DeegC/UTC/releases/download/1.1/$DEB_FILE

    # Do we need --force-overwrite here?
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
    if ! which msmtp > /dev/null; then
        sudo apt install --assume-yes msmtp mailutils
    fi

    echo "# Set up msmtp to send email via gmail.
defaults
auth           on
tls            on
tls_starttls   on
tls_trust_file /etc/ssl/certs/ca-certificates.crt

account        gmail
host           smtp.gmail.com
port           587
from           $GMAIL_ACCOUNT
user           $GMAIL_ACCOUNT
password       $GMAIL_PASSWORD

account default : gmail" > /etc/msmtprc

    # Set up script to send email when network is up.
    echo "#!/bin/bash
send_mail(){
    sleep 60 # Give msmtp time to start up and finish booting.
    echo -e \"Subject: RPi IP\n\n  $(ip addr show wlan0)\" | msmtp -v $GMAIL_EMAIL_RECIPIENT
}
send_mail &" > /etc/network/if-up.d/send-ip
    chmod +x /etc/network/if-up.d/send-ip
fi

if echo "$BLUETOOTH" | grep -iq "^[yt1]"; then
    if which bluetoothctl > /dev/null; then
        echo "Installing bluetooth"
        apt install --assume-yes bluez
    fi

    echo "We will now try to pair with your phone.  Make sure BT is on and discoverable."
    echo "Execute the following once bluetoothctl starts: "
    echo "      scan on"
    echo "      trust <MAC ADDR>"
    echo "      pair <MAC ADDR>"
    echo "      exit"

    bluetoothctl
fi
