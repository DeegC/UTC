#!/bin/sh

# Initializes the RPi pins to be low.

initialize_pin() {
    pin=$1
    # Use sleep to give commands a chance to finish
    echo "pin = $pin"
    echo "$pin" > /sys/class/gpio/export   # Turn pin on.  I/O error means it's already on.
    sleep 1
    echo "out" > /sys/class/gpio/gpio$pin/direction
    sleep 1
    echo "1" > /sys/class/gpio/gpio$pin/value
    sleep 1
    echo "0" > /sys/class/gpio/gpio$pin/value
}

# Wait for pigpio to start
while [ -z $(pigs t) ] ; do
    echo "Pigs not up yet"
    sleep 0.5
done
echo "Pigs is up $(pigs t) for $(whoami)"

initialize_pin 4  # Buzzer
initialize_pin 16 # led2
# Looks like setting pin for out doesn't work with PWM.
#initialize_pin 18 # PWM
initialize_pin 20 # led3
initialize_pin 23 # aux out
initialize_pin 24 # ? May have been a typo.
initialize_pin 25 # led 1
