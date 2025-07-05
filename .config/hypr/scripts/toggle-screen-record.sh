#!/usr/bin/env bash
# toggle-screen-record.sh - simple wf-recorder toggle for Sway/Wayland
# Records screen and system audio only (no mic), saves to ~/Videos.

PIDFILE="$HOME/.cache/wf-recorder.pid"

recording_running() {
  [ -f "$PIDFILE" ] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null
}

start_recording() {
  mkdir -p "$HOME/Videos"

  # Try to detect the monitor source of the default sink (for system sounds only)
  DEFAULT_SINK=$(pactl get-default-sink)
  MONITOR_SOURCE=$(pactl list short sources | grep "$DEFAULT_SINK.monitor" | cut -f2)

  if [ -z "$MONITOR_SOURCE" ]; then
    notify-send "wf-recorder error" "Cannot find monitor source for system audio"
    exit 1
  fi

  wf-recorder -f "$HOME/Videos/recording-$(date +%Y%m%d-%H%M%S).mp4" \
    --audio="$MONITOR_SOURCE" --codec libx264 &
  pid=$!

  sleep 0.5
  if kill -0 "$pid" 2>/dev/null; then
    echo "$pid" > "$PIDFILE"
    notify-send "Screen recording started"
  else
    notify-send "Failed to start screen recording"
  fi
}

stop_recording() {
  if recording_running; then
    pid=$(cat "$PIDFILE")
    kill -INT "$pid" 2>/dev/null
    while kill -0 "$pid" 2>/dev/null; do
      sleep 0.2
    done
    rm -f "$PIDFILE"
    notify-send "Screen recording stopped"
  else
    notify-send "No active screen recording"
  fi
}

case "$1" in
  start)
    recording_running || start_recording
    ;;
  stop)
    stop_recording
    ;;
  *)
    echo "Usage: $0 start|stop" >&2
    exit 1
    ;;
esac