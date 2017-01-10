#!/bin/bash

#curl -G --data-urlencode 'qual={"oi": {"id":10}}' localhost:4567/
curl -G --data-urlencode 'qual={
  "version": "1",
  "EntitySpec" : [ {
    "EntityName" : "Configuration",
    "QualAttrib" : [ {
      "EntityName" : "Configuration",
      "AttributeName" : "Id",
      "Value" : "1",
      "Oper" : "="
    } ]
  } ]
}' $UTC_SERVER:8080/utc/Configuration
