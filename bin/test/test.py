#!/usr/bin/env python

import math
import pdb

SCLK        = 11 # Serial-Clock                                                                 
MOSI        = 10 # Master-Out-Slave-In                                                  
MISO        = 9 # Master-In-Slave-Out                                                    
CS          = 8 # Chip-Select                                                             

def get_channel_mcp(channel):
    if channel > 7:
        raise ValueError()
    return 3918

def median_filter(raw):
    # Kombinierter Median und Mittelwertfilter
    laenge = len(raw)
    sortiert = sorted(raw)
    # Mitte des Arrays finden
    index = int(round(laenge * 0.5))
    area_groesse = 1 + int(round(math.log(laenge) ))
    area = sortiert[index-area_groesse:index+area_groesse+1]
    return sum(area) / len(area)

def read_sensors():
    values = [0]*8;
    for i in range(8):
        # The read_adc function will get the value of the specified channel (0-7).
        values[i] = float( get_channel_mcp( i ) )

    return values


def temperatur_sensor (Rt, typ, unit): #Ermittelt die Temperatur

    if Rt == 0.0:
        return -1.0
    
    a = 0.00335672 # Config_Sensor.getfloat(typ,'a')
    b = 0.000291888 # Config_Sensor.getfloat(typ,'b')
    c = 0.00000439054 # Config_Sensor.getfloat(typ,'c')
    Rn = 200 # Config_Sensor.getfloat(typ,'Rn')

    r = Rt/Rn
    print "Resistance = ", r
    r = math.log(r)
    T = (1/(a + b*r + c*r*r)) - 273

    if T is None:
        return -1.0
    
    if unit == 'celsius':
        return T
    elif unit == 'fahrenheit':
        return T * 1.8 +32

messwiderstand = 10
maxadc = 4096.0

#values = read_sensors()
values =  [3908.0, 2837.0, 3914.0, 4095.0, 4095.0, 4095.0, 4095.0, 4095.0]
print "ADC values = ", values

for i in range(8):
    values[i] = 4095.0 - values[i]
    #values[i] = median_filter( [ values[i], values[i], values[i] ] )

for i in range(8):
    if values[i] > 0:
        values[i] = messwiderstand*((maxadc/ values[i]) - 1)

print "Before SH values = ", values

for i in range(8):
        values[i] = round(temperatur_sensor(values[i], 5, 'fahrenheit'), 2)

print "Temperatures F = ", values


