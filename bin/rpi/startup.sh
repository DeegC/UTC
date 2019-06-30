#!/bin/sh

# Initializes the RPi pins to be low.

initialize_pin() {
        echo "pin = $1"
        echo "$1" > /sys/class/gpio/export   # Turn pin on.  I/O error means it's already on.
        echo "out" > /sys/class/gpio/gpio$1/direction
        echo "1" > /sys/class/gpio/gpio$1/value
        sleep 1
        echo "0" > /sys/class/gpio/gpio$1/value
}

initialize_pin 4  # Buzzer
initialize_pin 16 # led2
initialize_pin 18 # PWM
initialize_pin 20 # led3
initialize_pin 23 # aux out
initialize_pin 24 # ? May have been a typo.
initialize_pin 25 # led 1
