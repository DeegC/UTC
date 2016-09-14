#!/bin/bash

if [ "$1" == "-d" ]; then
    gradle appRunDebug
else
    gradle appRun
fi
