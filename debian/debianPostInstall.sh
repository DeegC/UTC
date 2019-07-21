#!/bin/sh

# Let java apps access port 80
sudo setcap CAP_NET_BIND_SERVICE=+eip $(readlink -f $(which java))

systemctl enable pigpiod
systemctl enable utc-server
