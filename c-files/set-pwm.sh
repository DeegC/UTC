#!/bin/bash

freq="$1"
duty_cycle="$2" # 0-100
echo "duty cycle=$duty_cycle"

# request device- must be done before any of the following settings can be changed
if ! find /sys/class/pwm/pwmchip0/pwm0 &> /dev/null; then
    echo 0 > /sys/class/pwm/pwmchip0/export

    # set the polarity to active HIGH (echo normal) or active LOW (echo inversed)- must be done before enabled
    echo normal > /sys/class/pwm/pwmchip0/pwm0/polarity
fi

# enable PWM channel using set- must be done before period or duty_cycle are set)
echo 1 > /sys/class/pwm/pwmchip0/pwm0/enable

hz=$((1000000000 / freq))
echo "hz  =$hz"
# set the period to 1 second (adjust as needed in nanoseconds)
echo "$hz" > /sys/class/pwm/pwmchip0/pwm0/period

duty=$(($hz * $duty_cycle / 100))
echo "duty=$duty"

# set the duty cycle to 500 ms (adjust as needed in nanoseconds)
echo "$duty" > /sys/class/pwm/pwmchip0/pwm0/duty_cycle
