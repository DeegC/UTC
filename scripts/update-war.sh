#!/bin/bash

# Copy .war file to server.

if [ "$1" == "" ]; then
    echo "Servers's IP address required as first param"
    exit 1
fi

remote_server="$1"
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
WAR=$(find $DIR/../bin -name \*.war)
echo $DIR/$WAR
scp $WAR $remote_server:/opt/utc
ssh $remote_server -t 'sudo service utc-server restart'
