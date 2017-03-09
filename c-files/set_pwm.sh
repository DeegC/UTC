#!/bin/sh

# request device- must be done before any of the following settings can be changed
echo 0 > /sys/class/pwm/pwmchip0/export

# set the polarity to active HIGH (echo normal) or active LOW (echo inversed)- must be done before enabled
echo inversed > /sys/class/pwm/pwmchip0/pwm0/polarity

# enable PWM channel using set- must be done before period or duty_cycle are set)
echo 1 > /sys/class/pwm/pwmchip0/pwm0/enable

# set the period to 1 second (adjust as needed in nanoseconds)
echo 1000000000 > /sys/class/pwm/pwmchip0/pwm0/period

# set the duty cycle to 500 ms (adjust as needed in nanoseconds)
echo 500000000 > /sys/class/pwm/pwmchip0/pwm0/duty_cycle
