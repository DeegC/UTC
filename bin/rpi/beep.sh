#!/bin/sh

milli_to_seconds() {
    seconds=$(awk "BEGIN {print ($1 / 1000.0)}")
}

# Put the beep code in a function so it's easy to run in the background
beep() {
    while [ ! -z "$1" ]; do
	milli_to_seconds $1
	shift

	# Make buzzer pin high:
	echo "1" > /sys/class/gpio/gpio4/value
	echo "sleep $seconds"
	sleep $seconds
	echo "0" > /sys/class/gpio/gpio4/value
	if [ ! -z "$1" ]; then
	    milli_to_seconds $1
	    shift
	    echo "sleep $seconds"
	    sleep $seconds
	fi
    done
}

beep $* &
