# UTC - Universal Temperature Controller

This is a work-in-progress repository for creating a temperature controller that can be used in many situations like BBQ smokers and sous vide.

This is the next generation controller based on my previous [UDS] (http://www.instructables.com/id/Tweeting-Wireless-Ugly-Drum-Smoker-UDS-tempera/)

# Status

The software and hardware have been tested and it is all working at a basic level.  Unfortunately
the hardware was built using a NTC C.H.I.P. which is not currently available (with no known date
for when that will change).

We are currently in the process of changing the hardware to use the Raspberry Pi Zero W.  The
RPi is ~ $10 more (when the SD card is included) but has lots of support and is ubiquitous.

# Build

If you have Gradle installed, run:

```gradle build```

Otherwise run:

```./gradlew build```

# Install on Target environment (RPi, CHIP)

To be done.

# Start Server

In ./bin directory run:

```./start_server.sh```