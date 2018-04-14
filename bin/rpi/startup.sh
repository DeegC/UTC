#!/bin/sh
#Initializes all gpio pins to output mode and sets them all LOW
sleep 2
echo "4" > /sys/class/gpio/export
echo "18" > /sys/class/gpio/export
echo "23" > /sys/class/gpio/export
echo "25" > /sys/class/gpio/export
echo "16" > /sys/class/gpio/export
echo "20" > /sys/class/gpio/export
sleep 2
echo "out" > /sys/class/gpio/gpio4/direction
echo "out" > /sys/class/gpio/gpio18/direction
echo "out" > /sys/class/gpio/gpio23/direction
echo "out" > /sys/class/gpio/gpio25/direction
echo "out" > /sys/class/gpio/gpio16/direction
echo "out" > /sys/class/gpio/gpio20/direction
echo "1" > /sys/class/gpio/gpio4/value
echo "1" > /sys/class/gpio/gpio18/value
echo "1" > /sys/class/gpio/gpio23/value
echo "1" > /sys/class/gpio/gpio25/value
echo "1" > /sys/class/gpio/gpio16/value
echo "1" > /sys/class/gpio/gpio20/value
sleep 1
echo "0" > /sys/class/gpio/gpio4/value
echo "0" > /sys/class/gpio/gpio18/value
echo "0" > /sys/class/gpio/gpio23/value
echo "0" > /sys/class/gpio/gpio25/value
echo "0" > /sys/class/gpio/gpio16/value
echo "0" > /sys/class/gpio/gpio20/value
