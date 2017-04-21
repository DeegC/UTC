/*
 * Inspired by spidev.c
 * Copyright (c) 2007  MontaVista Software, Inc.
 * GPLv2
 */

#include <stdint.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <getopt.h>
#include <fcntl.h>
#include <sys/ioctl.h>
#include <linux/types.h>
#include <linux/spi/spidev.h>

#define ARRAY_SIZE(a) (sizeof(a) / sizeof((a)[0]))

static const char *device = "/dev/spidev32766.0";
static uint8_t mode;
static uint8_t bits = 8;
static uint32_t speed = 500000;
static uint16_t delay;

static int read3008(int fd, int line, int bil)
{
  int ret;
  uint8_t tx[]={1,0,0};
  uint8_t rx[]={1,0,0};
  struct spi_ioc_transfer tr = {
    .tx_buf = (unsigned long)tx,
    .rx_buf = (unsigned long)rx,
    .len = ARRAY_SIZE(tx),
    .delay_usecs = delay,
    .speed_hz = speed,
    .bits_per_word = bits,
  };
  tx[1] = ((bil & 1)?0x00:0x80) | ((line & 0x7)<< 4);
  ret = ioctl(fd, SPI_IOC_MESSAGE(1), &tr); 
  if (ret < 1) {
    perror("can't send spi message");
    abort();
  }
  return ((rx[1]&0x3)<<8)+rx[2];
}

int main(int argc, char *argv[])
{
  int ret = 0;
  int fd;
  int i;
  fd = open(device, O_RDWR);
  if (fd < 0) {
    perror("can't open device");
    abort();
  }
  for(i=0; i<8; i++) {
    double rv= (double) read3008(fd,i,0);
    printf("%lf\n",rv*3.300/1024);
  }
  close(fd);
  return ret;
}

