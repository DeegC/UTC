#!/bin/bash

echo "Setting PWM to freq=$1 cycle=$2"
freq="$1" # In Hz
duty_cycle="$2" # 0-100
let "dcycle=10000 * $duty_cycle"
pigs hp 18 $freq $dcycle
