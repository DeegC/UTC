#!/bin/bash

#curl -G --data-urlencode 'qual={"oi": {"id":10}}' localhost:4567/
curl -G --data-urlencode 'qual={
}' $UTC_SERVER/api/utc/Instant
