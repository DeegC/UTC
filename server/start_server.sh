#!/bin/bash

# Get the path of start_server.sh
DIR=$(readlink -e $0)
cd $(dirname $DIR) > /dev/null
pwd

JETTY_RUNNER=$(find jetty -name jetty-runner*)
UTC_WAR=$(find build -name utc-server*.war)
PORT=8080

JETTY_DEBUG=
if [ "$1" == "-d" ]; then
    JETTY_DEBUG="-Xdebug -agentlib:jdwp=transport=dt_socket,address=8000,server=y,suspend=n"
    # -Dorg.eclipse.jetty.LEVEL=DEBUG
fi

# Add bin directory to path depending on the local architecture.
arch=$(lscpu | grep Arch | awk '{print $2}')
if [ "$arch" == "armv7l" ]; then
    PORT=80
    
    # The directory that contains the bin files/scripts for interfacing with the CHIP hardware.
    export PATH="$PATH:../bin/chip"
else
    export PATH="$PATH:../bin/test"  # Test files.
fi

set-pwm.sh 10000 0  # We may need to make freq configurable.
set-led.sh green on # Leave yellow alone--it indicates network connection
set-led.sh red on

# Set up chart dir and clean out old files
mkdir -p ./charts > /dev/null
find ./charts/* -mtime +30 -exec rm {} \;

# Set up logs dir and clean out old files
mkdir -p ./logs > /dev/null
find ./logs/* -mtime +30 -exec rm {} \;

#java -Xmx100m $JETTY_DEBUG -DSQLITE_ROOT=$(pwd)/../sqlite -jar $JETTY_RUNNER --port $PORT --classes $(pwd)/../conf $UTC_WAR |& tee -a ./logs/jetty.log
java -Xmx100m $JETTY_DEBUG -DSQLITE_ROOT=$(pwd)/../sqlite -jar $JETTY_RUNNER --port $PORT --classes $(pwd)/../conf $UTC_WAR
