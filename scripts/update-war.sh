#!/bin/bash

# Rsync .war file to CHIP server.  This is faster than building it on CHIP.

if [ "$1" == "" ]; then
    echo "CHIP's IP address required as first param"
    exit 1
fi

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/..
DIR=$(pwd)
WAR=$(find . -name \*.war)
echo $DIR/$WAR
rsync -av $DIR/$WAR $1:$DIR/$WAR
