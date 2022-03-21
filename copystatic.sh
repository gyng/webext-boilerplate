#!/bin/sh

set -eu

find dist -name "index-*.html" -exec mv '{}' dist/src/options/index.html \;
