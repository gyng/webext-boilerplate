#!/bin/sh

set -eu

find dist -name "index-*.html" -exec mv '{}' dist/options/index.html \;
