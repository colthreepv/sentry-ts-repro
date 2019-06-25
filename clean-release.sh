#!/bin/sh
# VERSION 1.0.0
# Local build script
set -e

VERSION=$(node -e 'console.log(require("./package.json").version)')
./node_modules/.bin/sentry-cli releases files $VERSION delete -A
