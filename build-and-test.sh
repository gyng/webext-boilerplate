#!/bin/sh

set -eu

npm run build && npm run lint && npm run test
