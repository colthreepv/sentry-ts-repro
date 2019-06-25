#!/bin/sh
# VERSION 1.0.0
# Local build script
set -e

BUILD_DIR=$1
if [ "$BUILD_DIR" = "" ]; then
  echo "first argument is required, BUILD_DIR"
  exit 1
fi

npm i

npm run clean
npm run build
VERSION=$(node -e 'console.log(require("./package.json").version)')

if [ "$SENTRY_DSN" != "" ]; then
  ./node_modules/.bin/sentry-cli releases new $VERSION
  ./node_modules/.bin/sentry-cli releases files $VERSION \
    upload-sourcemaps $BUILD_DIR --no-rewrite
  ./node_modules/.bin/sentry-cli releases finalize $VERSION
fi
