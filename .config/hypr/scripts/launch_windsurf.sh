#!/bin/bash
{
  echo "[$(date)] launch_windsurf.sh triggered" >> "$HOME/windsurf_launch.log"
  windsurf &>> "$HOME/windsurf_launch.log" &
} &
