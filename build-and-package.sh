#!/bin/sh

set -eu

yarn build && yarn package
