#!/bin/bash

# This runs a Zeidon ruby script using JRuby.  It will use Maven to build
# the classpath.

DEBUG_FLAGS=
DEBUG_PORT=8000
cpfile="./build/classpath.txt"

while getopts "cdx:" option; do
    case $option in
        c)
            echo "Removing $cpfile"
            rm $cpfile > /dev/null
            ;;
        d)
            echo "Starting JRuby in debug mode"
            DEBUG_FLAGS="-J-Xrunjdwp:transport=dt_socket,address=$DEBUG_PORT,server=y,suspend=n"
            ;;
        x)
            echo "Starting JRuby with debug in suspend mode"
            DEBUG_FLAGS="-J-Xrunjdwp:transport=dt_socket,address=$DEBUG_PORT,server=y,suspend=y"
            ;;
    esac
done

#
# Create a temp file with the classpath.
#

# If the temp file exists and is > 24 hours old delete it so we can recreate it.
if [ -f $cpfile ]; then
    if test "`find $cpfile -mmin +1440`"; then
        echo "$cpfile is old and will be regenerated"
        rm $cpfile
    fi
fi

if [ -f $cpfile ]; then
    echo "Using cached classpath ($cpfile)"
else
    echo "Getting classpath..."
    gradle writeClasspath
fi

cp=`cat $cpfile`
echo "cp=$cp"

JMXOPTS="-J-Dcom.sun.management.jmxremote
         -J-Dcom.sun.management.jmxremote.port=9010
         -J-Dcom.sun.management.jmxremote.local.only=true
         -J-Dcom.sun.management.jmxremote.authenticate=false
         -J-Dcom.sun.management.jmxremote.ssl=false"

echo "require 'zeidon.rb'; oe = Zeidon.get_object_engine" > /tmp/x.rb
export SQLITE_ROOT="../sqlite"

echo "Calling jirb..."
jruby -J-cp "$cp" -S irb -r /tmp/x.rb
