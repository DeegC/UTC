#!/bin/bash

if [ -z "$1" ]; then
    echo "First argument must be log file name"
    exit 1
fi

curl "$UTC_SERVER/api/utc/getLogFile/$1"
