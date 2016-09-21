#!/bin/bash

# Use 'KILL' to shut down UDP socket.
echo -n "IPREQUEST" | nc -4uv -w1 localhost 4445
