#!/bin/sh

set -eu

yarn build && yarn lint && yarn test
