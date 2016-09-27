#!/bin/bash

JETTY_RUNNER=$(find jetty -name jetty-runner*)
UTC_WAR=$(find build -name server*.war)
PORT=8080

java -Xmx50m -DSQLITE_ROOT=$(pwd)/../sqlite -jar $JETTY_RUNNER --port $PORT --classes $(pwd)/conf $UTC_WAR

exit 0

# Following kept for posterity

if [ "$1" == "-d" ]; then
    gradle appRunDebug
else
    gradle appRun
fi
