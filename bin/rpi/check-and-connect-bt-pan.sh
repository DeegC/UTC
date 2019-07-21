#!/bin/sh

# This script is run by cron and attempts to create a Bluetooth connection with the
# device specified by BT_MAC_ADDR.  The connection will then be used to tether IP.
# Note that these must be paired.

# Copied from https://github.com/WayneKeenan/RaspberryPi_BTPAN_AutoConnect

BT_MAC_ADDR=AC:37:43:84:81:60

SCRIPT=$(readlink -f $0)
SCRIPTPATH=`dirname $SCRIPT`

/sbin/ifconfig bnep0 > /dev/null 2>&1
status=$?
if [ $status -ne 0 ]; then
        echo "Connecting to $BT_MAC_ADDR"
        $SCRIPTPATH/bt-pan client -r  $BT_MAC_ADDR
fi
