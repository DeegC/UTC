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
rsync -av --exclude .gradle --exclude .git --exclude server/logs --exclude server/charts --exclude sqlite/utc.sqlite.db\* . $1:/home/dgc/projects/UTC
