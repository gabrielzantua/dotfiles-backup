#!/bin/bash

# Description:
# This script safely reloads Waybar in Arch Linux.
# It first checks if Waybar is running, kills it, waits for it to terminate,
# then launches it again in the background.

# Function to print messages clearly
echo_info() {
  echo -e "\033[1;32m[INFO]\033[0m $1"
}
echo_error() {
  echo -e "\033[1;31m[ERROR]\033[0m $1"
}

# Check if waybar is running
if pgrep -x "waybar" > /dev/null; then
  echo_info "Waybar is running. Reloading..."
  killall waybar
  sleep 1  # Give it a moment to terminate
else
  echo_info "Waybar is not running. Starting it..."
fi

# Start Waybar in the background (assumes XDG autostart or systemd session)
nohup waybar > /dev/null 2>&1 &

# Confirm
if pgrep -x "waybar" > /dev/null; then
  echo_info "Waybar started successfully."
else
  echo_error "Failed to start Waybar."
fi
