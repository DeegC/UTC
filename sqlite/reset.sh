#!/bin/bash

mv utc.sqlite.db /tmp  # Back it up, just in case.
sqlite3 utc.sqlite.empty.db < ../zeidon/src/main/resources/utc/Sqlite.ddl
