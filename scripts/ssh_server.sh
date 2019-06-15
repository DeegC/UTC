#!/bin/bash

# SSH to UTC server.

if [ "$1" == "" ]; then
    echo "UTC's IP address required as first param"
    exit 1
fi

xterm.sh -bg black -fg white -e ssh $1 &
