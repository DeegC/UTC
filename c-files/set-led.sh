#!/bin/sh

BASE=/sys/class/gpio
case "$1" in
  green) pin=1013
    ;;
  yellow) pin=1015
    ;;
  red) pin=1017
    ;;
  *) echo "Unknown value $1"
    exit 1
esac

case "$2" in
  on) value=0
    ;;
  off) value=1
    ;;
  *) echo "Unknown value $2"
    exit 1
esac

if ! find $BASE/gpio$pin 2> /dev/null; then
    echo "$pin" > $BASE/export
    echo "out" > $BASE/gpio$pin/direction
fi

echo "$value" > $BASE/gpio$pin/value
