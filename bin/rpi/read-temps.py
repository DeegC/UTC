#!/usr/bin/env python

import math
import pigpio
from struct import pack, unpack

SCLK        = 11 # Serial-Clock                                                                 
MOSI        = 10 # Master-Out-Slave-In                                                  
MISO        = 9 # Master-In-Slave-Out                                                    
CS          = 8 # Chip-Select                                                             

pi = pigpio.pi()
retval = pi.bb_spi_open(CS, MISO, MOSI, SCLK, 20000, 0)

def get_channel_mcp(channel):
    command = pack('>Hx', (0x18 + channel) << 6)
    return unpack('>xH', pi.bb_spi_xfer(CS, command)[1])[0] & 0x0FFF

def average_filter(raw):
    total = sum( raw )
    return 4095.0 - ( total / len( raw ) )

def median_filter(raw):
    laenge = len(raw)
    sortiert = sorted(raw)
    index = int(round(laenge * 0.5))
    area_groesse = 1 + int(round(math.log(laenge) ))
    area = sortiert[index-area_groesse:index+area_groesse+1]
    return 4095.0 - ( sum(area) / len(area) )

def read_sensors():
    values = [0]*8;
    for i in range(8):
        values[i] = map( get_channel_mcp, [i]*4 )

    return values


a = 0.00335672 # Config_Sensor.getfloat(typ,'a')
b = 0.000291888 # Config_Sensor.getfloat(typ,'b')
c = 0.00000439054 # Config_Sensor.getfloat(typ,'c')
Rn = 200 # Config_Sensor.getfloat(typ,'Rn')

def temperatur_sensor (Rt, unit): #Ermittelt die Temperatur                                                                                                
    if Rt == 0.0:
        return None

    v = math.log(Rt/Rn)
    T = (1/(a + b*v + c*v*v)) - 273

    if unit == 'celsius':
        return T
    elif unit == 'fahrenheit':
        return T * 1.8 +32


messwiderstand = 10
maxadc = 4096.0

values = read_sensors()
values = map( average_filter, values )
print "ADC values = ", values

for i in range(8):
    if values[i] > 2:
        values[i] = messwiderstand*((maxadc / values[i] ) - 1)
        values[i] = round(temperatur_sensor(values[i], 'fahrenheit'), 2)
    else:
        values[i] = 0.0

print "Temperatures F = "
for t in values:
    print t
pi.bb_spi_close(CS)
pi.stop()

