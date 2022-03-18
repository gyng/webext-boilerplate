#! /bin/bash

set euox -pipefail

find dist -name "index-*.html" -exec mv '{}' dist/src/options/index.html \;
