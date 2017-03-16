#!/bin/bash

# Get the path of start_server.sh
DIR=$(readlink -e $0)
cd $(dirname $DIR) > /dev/null
pwd

# If we're on a CHIP then turn on some LEDs to indicate we're starting.
arch=$(lscpu | grep Arch | awk '{print $2}')
if [ "$arch" == "armv7l" ]; then
    ../c-files/set-led.sh green on
    ../c-files/set-led.sh yellow on
    ../c-files/set-led.sh red on
fi

# Add c-files so server can turn on/off LEDs.
export PATH="$PATH:../c-files"

# Set up chart dir and clean out old files
mkdir -p ./charts > /dev/null
find ./charts -mtime +30 -exec rm {} \;

# Set up logs dir and clean out old files
mkdir -p ./logs > /dev/null
find ./logs -mtime +30 -exec rm {} \;

JETTY_RUNNER=$(find jetty -name jetty-runner*)
UTC_WAR=$(find build -name utc-server*.war)
PORT=8080

JETTY_DEBUG=
if [ "$1" == "-d" ]; then
    JETTY_DEBUG="-Xdebug -agentlib:jdwp=transport=dt_socket,address=8000,server=y,suspend=n"
fi

# -Dorg.eclipse.jetty.LEVEL=DEBUG

#java -Xmx100m $JETTY_DEBUG -DSQLITE_ROOT=$(pwd)/../sqlite -jar $JETTY_RUNNER --port $PORT --classes $(pwd)/../conf $UTC_WAR |& tee -a ./logs/jetty.log
java -Xmx100m $JETTY_DEBUG -DSQLITE_ROOT=$(pwd)/../sqlite -jar $JETTY_RUNNER --port $PORT --classes $(pwd)/../conf $UTC_WAR
