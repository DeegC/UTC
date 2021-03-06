#!/bin/bash

# Rsync .deb files up to UTC hardware.

if [ "$1" == "" ]; then
    echo "UTC's IP address required as first param"
    exit 1
fi

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/..
DIR=$(pwd)
echo $DIR
rsync -av debian/build/distributions/*.deb $1:/tmp

echo "Install with:"
echo "sudo dpkg -i  /tmp/utc_1.1-1_all.deb"
