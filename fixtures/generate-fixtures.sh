#!/usr/bin/env sh

# This regenerates for all files causing timestamps to change.
# Snapshots will become invalid due to this but easily reviewable in git diff.

cd $(dirname $0)
for i in $(find * -name '*.cjs' -exec basename {} .cjs \;|grep -ve libtap); do
  node ${i}.cjs > ${i}.txt
done
