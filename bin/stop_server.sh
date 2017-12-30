#!/bin/bash

pkill -f jetty-runner

# Just in case, we'll pause for a second then try again with -9
sleep 1
pkill -9 -f jetty-runner
