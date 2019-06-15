#!/bin/sh

# https://bbs.nextthing.co/t/manually-input-wifi-ssid/4720
# http://linux.icydog.net/wpa.php

wpa_supplicant -D nl80211,wext -i wlan0 -c <(wpa_passphrase "SSID" "KEY")
