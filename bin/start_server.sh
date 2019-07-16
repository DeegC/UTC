#!/bin/bash

# Get the path of start_server.sh
DIR=$(realpath -e $0)
cd $(dirname $DIR) > /dev/null
pwd

mkdir -p tmp > /dev/null

JETTY_RUNNER=$(ls jetty-runner*.jar)
UTC_WAR=$(ls utc-server*.war)

JETTY_DEBUG=
if [ "$1" == "-d" ]; then
    JETTY_DEBUG="-Xdebug -agentlib:jdwp=transport=dt_socket,address=8000,server=y,suspend=n"
    # -Dorg.eclipse.jetty.LEVEL=DEBUG
fi

# Add bin directory to path depending on the local architecture.
if which lsb_release; then
    arch=$(lsb_release -a | grep 'Distributor ID:' | awk '{print $3}')
else
    arch="test"
fi

case "$arch" in
    chip)
	echo "Using C.H.I.P"
	HARDWARE="chip"
	PORT=80
    
	# The directory that contains the bin files/scripts for interfacing with the CHIP hardware.
	export PATH="$PATH:./chip"
	;;
    
    Raspbian)
	echo "Using Raspberry Pi"
	HARDWARE="rpi"
	PORT=80
	export PATH="$PATH:./rpi"
        # Initialize ports/speaker.
	./rpi/startup.sh
	;;
    
    *)
	HARDWARE="test"
	PORT=8080
	export PATH="$PATH:./test"  # Test files.
	;;
esac

# Make sure sqlite db exists.  If not, copy empty one.
if [ ! -f ./utc.sqlite.db ]; then
    cp ./utc.sqlite.empty.db ./utc.sqlite.db
fi

set-pwm.sh 10000 0  # We may need to make freq configurable.
set-led.sh green on # Leave yellow alone--it indicates network connection
set-led.sh red on
beep.sh 100 100 100

# Set up chart dir and clean out old files
mkdir -p ./tmp/charts > /dev/null
find ./tmp/charts/* -mtime +30 -exec rm {} \;

# Set up logs dir and clean out old files
mkdir -p ./tmp/logs > /dev/null
find ./tmp/logs/* -mtime +30 -exec rm {} \;

java -Xmx200m $JETTY_DEBUG -DHARDWARE=$HARDWARE -DSQLITE_ROOT=$(pwd) -jar $JETTY_RUNNER --port $PORT --classes ./conf $UTC_WAR 2>&1 | tee -a ./tmp/logs/jetty.log
#java -Xmx100m $JETTY_DEBUG -DSQLITE_ROOT=$(pwd) -jar $JETTY_RUNNER --port $PORT --classes ./conf $UTC_WAR
