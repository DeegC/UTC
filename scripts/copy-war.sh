#!/bin/bash

# Rsync changes up to CHIP server.  This is faster than building it on CHIP.

if [ "$1" == "" ]; then
    echo "CHIP's IP address required as first param"
    exit 1
fi

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/..
DIR=$(pwd)
echo $DIR
WAR=$(find . -name *.war)
echo 

rsync -avx $WAR $1:/home/dgc/projects/UTC/$WAR
