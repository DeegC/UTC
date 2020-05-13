# UTC - Universal Temperature Controller

This is a work-in-progress repository for creating a temperature controller that can be used in many situations like BBQ smokers and sous vide.

This is the next generation controller based on my previous [UDS] (http://www.instructables.com/id/Tweeting-Wireless-Ugly-Drum-Smoker-UDS-tempera/)


# Install

First time install, which will set up user(s) and installs necessary packages.  This will set up UTC to automatically start.

```
wget https://raw.githubusercontent.com/DeegC/UTC/master/installs/install-utc.sh
wget https://raw.githubusercontent.com/DeegC/UTC/master/installs/utc.config
chmod +x install-utc.sh
sudo ./install-utc.sh
```

If you want to change default install behavior edit ```utc.config``` before running ```install-utc.sh```.  See comments in the file for more.

# Install Oracle Java 8 JDK

https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

# Build

If you have Gradle installed, run:

```gradle build```

Otherwise run:

```./gradlew build```


