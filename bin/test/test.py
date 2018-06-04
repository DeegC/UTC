#!/usr/bin/env python

import math

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
    name = "ET-73" # Config_Sensor.get(typ,'name')

    T = None

    if not name in ('PT100', 'PT1000'):
        a = 0.00335672 # Config_Sensor.getfloat(typ,'a')
        b = 0.000291888 # Config_Sensor.getfloat(typ,'b')
        c = 0.00000439054 # Config_Sensor.getfloat(typ,'c')
        Rn = 200 # Config_Sensor.getfloat(typ,'Rn')

        try:
            v = math.log(Rt/Rn)
            T = (1/(a + b*v + c*v*v)) - 273
        except: #bei unsinnigen Werten (z.B. ein- ausstecken des Sensors im Betrieb) Wert 999.9                                                                 
            pass
    else:
        Rkomp = Config_Sensor.getfloat(typ,'Rkomp')
        Rt = Rt - Rkomp
        if name == 'PT100':
            Rpt=0.1
        else:
            Rpt=1
        try:
            T = (-1)*math.sqrt( Rt/(Rpt*-0.0000005775) + (0.0039083**2)/(4*((-0.0000005775)**2)) - 1/(-0.0000005775)) - 0.0039083/(2*-0.0000005775)
        except:
            pass

    if T is not None:
        if unit == 'celsius':
            return T
        elif unit == 'fahrenheit':
            return T * 1.8 +32


messwiderstand = 10
maxadc = 4096.0

values = read_sensors()
print "ADC values = ", values

for i in range(8):
    values[i] = 4095.0 - values[i]
    values[i] = median_filter( [ values[i], values[i], values[i] ] )
    if values[i] > 0:
        values[i] = messwiderstand*((maxadc/ values[i]) - 1)
        print "Value ", values[i], i
        values[i] = round(temperatur_sensor(values[i], 5, 'fahrenheit'), 2)

print "Temperatures F = ", values


