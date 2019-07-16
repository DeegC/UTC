Install with :
sudo dpkg -i --force-overwrite [DEB-FILE]

force-overwrite is needed for now because it needs to overwrite pigspiod startup.
Pigs could probably be removed from the .deb if we add it as a package dependency.