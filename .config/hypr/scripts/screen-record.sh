#!/usr/bin/env bash
# toggle-screen-record.sh - screen & system audio recording with framerate choice

PIDFILE="$HOME/.cache/wf-recorder.pid"
OUTPUT_DIR="$HOME/Videos"

ask_framerate() {
  yad --entry \
    --title="Select Framerate" \
    --text="Enter desired framerate (60 or 120):" \
    --entry-text="60" "120"
}

recording_running() {
  [ -f "$PIDFILE" ] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null
}

start_recording() {
  mkdir -p "$OUTPUT_DIR"
  FRAMERATE=$(ask_framerate)
  [[ "$FRAMERATE" != "60" && "$FRAMERATE" != "120" ]] && FRAMERATE=60

  TIMESTAMP=$(date +%Y%m%d-%H%M%S)
  OUTFILE="$OUTPUT_DIR/recording-$TIMESTAMP.mp4"

  DEFAULT_SINK=$(pactl get-default-sink)
  MONITOR_SRC="${DEFAULT_SINK}.monitor"

  if ! pactl list short sources | grep -q "$MONITOR_SRC"; then
    notify-send "Recording failed" "Monitor source not found."
    exit 1
  fi

  notify-send "Recording started" "$FRAMERATE FPS"

  wf-recorder \
    --file="$OUTFILE" \
    --audio="$MONITOR_SRC" \
    --framerate="$FRAMERATE" \
    --codec libx264 \
    --pixel-format yuv420p \
    --audio-codec aac &

  echo $! > "$PIDFILE"
  disown
}

stop_recording() {
  if recording_running; then
    kill -INT "$(cat "$PIDFILE")"
    rm -f "$PIDFILE"
    notify-send "Recording stopped" "$(ls -t $OUTPUT_DIR/recording-*.mp4 | head -n1)"
  else
    notify-send "No active recording"
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
    echo "Usage: $0 {start|stop}"
    exit 1
    ;;
esac
