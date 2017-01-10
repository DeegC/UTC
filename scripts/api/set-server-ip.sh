#!/bin/bash

if [ ! -z "$1" ]; then
    echo "$1" > /tmp/last-ip.txt
fi

export UTC_SERVER=$(cat /tmp/last-ip.txt)
