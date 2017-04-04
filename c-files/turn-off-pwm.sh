#!/bin/sh

# disable device
echo 0 > /sys/class/pwm/pwmchip0/pwm0/enable

# free device
echo 0 > /sys/class/pwm/pwmchip0/unexport
