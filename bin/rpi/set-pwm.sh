#!/bin/bash

freq="$1" # In Hz
duty_cycle="$2" # 0-100

echo "Setting PWM to freq=$1 cycle=$2"
 
let "pwmclock=19200000 / $freq / 100"
echo "pwmclock = $pwmclock"

gpio pwm-ms
gpio pwmc $pwmclock
gpio pwmr 100

gpio -g pwm 18 $duty_cycle

