#!/usr/bin/env bash

echo "Migration script start"
npm run migrate

# after migration will wait 1 secs to start up our service
sleep 1

echo "Service running up script start"
node app.js