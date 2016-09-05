# Various notes in installing stuff on CHIP.

### To get python script running.
Edit /lib/systemd/system/bluetooth.service and add '-C' after 'bluetoothd'. Reboot.
sudo sdptool add SP

### Automatically send ip after connect:
apt-get install ssmtp
Create /etc/network/if-up.d/send-ip
