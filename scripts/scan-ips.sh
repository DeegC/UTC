#!/bin/bash

network="192.168.0."
if [ ! -z "$1" ]; then
    network="$1"
fi

port=80
for host in {1..255}; do
    echo "Pinging $network$host"
    ping -c 1 $network$host &> /dev/null
    if [ $? -eq 0 ]; then
        echo " >>> Found $network$host <<<"
        (echo > /dev/tcp/$network$host/$port) &>/dev/null
        [ $? -eq 0 ] && [ $port -eq 53 ] && echo "$network$host DNS Server"
    fi
done
