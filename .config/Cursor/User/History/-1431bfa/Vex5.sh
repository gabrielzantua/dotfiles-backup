#!/bin/bash
if [[ -f /tmp/cava.txt ]]; then
  cava_bar=$(tail -n 1 /tmp/cava.txt)
  echo "$cava_bar"
else
  echo ""
fi 