#!/usr/bin/env python

import json
import sys
import argparse
try:
    from gi.repository import GLib, Playerctl
except ImportError:
    print(json.dumps({"text": "Missing python-gobject!"}))
    sys.exit(0)

def print_line(line):
    """
    Prints a line to stdout and flushes the buffer.
    """
    sys.stdout.write(line + '\n')
    sys.stdout.flush()

def get_player():
    try:
        manager = Playerctl.PlayerManager()
        players = manager.props.player_names
        if not players:
            return None
        return Playerctl.Player.new(players[0].name)
    except Exception:
        return None

def get_status_icon(status, player_name):
    if player_name and "spotify" in player_name.lower():
        player_icon = ""
    else:
        player_icon = "🎜"
    if status == Playerctl.PlaybackStatus.PLAYING:
        return f"{player_icon}"
    if status == Playerctl.PlaybackStatus.PAUSED:
        return f""
    return ""

def main():
    player = get_player()
    if not player:
        print_line(json.dumps({"text": "No media playing"}))
        return
    try:
        status = player.props.playback_status
        metadata = player.props.metadata
        player_name = player.props.player_name or ""
        if not metadata or status == Playerctl.PlaybackStatus.STOPPED:
            print_line(json.dumps({"text": "No media playing"}))
            return
        artist = metadata.get("xesam:artist", [""])[0]
        title = metadata.get("xesam:title", "")
        position = player.props.position
        length = metadata.get("mpris:length")
        progress_bar = ""
        if position and length and length > 0:
            bar_width = 10
            percent = position / length
            filled_width = int(bar_width * percent)
            bar = '█' * filled_width + '─' * (bar_width - filled_width)
            progress_bar = f"[{bar}]"
        icon = get_status_icon(status, player_name)
        output_text = f"{icon} {artist} - {title} {progress_bar}".strip()
        output = {"text": output_text, "tooltip": f"{artist} - {title}", "class": player_name.lower()}
        print_line(json.dumps(output))
    except Exception:
        print_line(json.dumps({"text": "No media playing"}))

if __name__ == "__main__":
    main() 