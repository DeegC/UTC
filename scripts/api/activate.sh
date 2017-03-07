#!/bin/bash

#curl -G --data-urlencode 'qual={"oi": {"id":10}}' localhost:4567/
curl -G --data-urlencode 'qual={
  "Id": 1
}' $UTC_SERVER/utc/Configuration
