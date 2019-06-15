#!/bin/bash

# SSH to CHIP server.

if [ "$1" == "" ]; then
    echo "CHIP's IP address required as first param"
    exit 1
fi

xterm.sh -bg gray -fg black -e ssh $1 &
