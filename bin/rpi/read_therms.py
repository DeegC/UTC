# Import SPI library (for hardware SPI) and MCP3008 library.
import Adafruit_GPIO.SPI as SPI
import Adafruit_MCP3008

SPI_PORT   = 0
SPI_DEVICE = 0
mcp = Adafruit_MCP3008.MCP3008(spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE))

# Read all the ADC channel values in a list.
for i in range(8):
    # The read_adc function will get the value of the specified channel (0-7).
    print( float( mcp.read_adc(i) ) * 3.3 / 1024.0 )
