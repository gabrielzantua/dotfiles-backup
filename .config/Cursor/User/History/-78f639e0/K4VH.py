#!/usr/bin/env python

import json
import sys
import argparse
from gi.repository import GLib, Playerctl

def print_line(line):
    """
    Prints a line to stdout and flushes the buffer.
    """
    sys.stdout.write(line + '\n')
    sys.stdout.flush()

def get_player_property(player, prop):
    """
    Safely get a property from the player.
    """
    try:
        return player.get_property(prop)
    except GLib.Error:
        return None

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--player",
        type=str,
        help="The name of the player to control (e.g., 'spotify').",
        default=None,
    )
    args = parser.parse_args()

    try:
        if args.player:
            player = Playerctl.Player.new(args.player)
        else:
            manager = Playerctl.PlayerManager()
            if not manager.props.player_names:
                print_line(json.dumps({"text": ""}))
                return
            player = Playerctl.Player.new(manager.props.player_names[0].name)

        player.connect("playback-status", on_playback_status_changed, player)
        player.connect("metadata", on_metadata_changed, player)
        manager.connect("name-appeared", on_player_appeared)
        manager.connect("player-vanished", on_player_vanished)

        on_playback_status_changed(player, player.props.playback_status)

        main_loop = GLib.MainLoop()
        main_loop.run()

    except GLib.Error as e:
        print_line(json.dumps({"text": ""}))

def get_status_icon(status, player_name):
    if "spotify" in player_name.lower():
        player_icon = ""
    else:
        player_icon = "🎜"
        
    if status == Playerctl.PlaybackStatus.PLAYING:
        return f"{player_icon}"
    if status == Playerctl.PlaybackStatus.PAUSED:
        return f"" # Pause icon
    return ""

def format_output(player):
    if not player or not get_player_property(player, "metadata"):
        print_line(json.dumps({"text": ""}))
        return

    status = get_player_property(player, "playback_status")
    metadata = get_player_property(player, "metadata")
    player_name = get_player_property(player, "player_name") or ""
    
    if not metadata or status == Playerctl.PlaybackStatus.STOPPED:
        print_line(json.dumps({"text": ""}))
        return

    artist = metadata.get("xesam:artist", [""])[0]
    title = metadata.get("xesam:title", "")
    
    # Text-based progress bar
    progress_bar = ""
    position = get_player_property(player, "position")
    length = metadata.get("mpris:length")

    if position is not None and length is not None and length > 0:
        bar_width = 10
        percent = position / length
        filled_width = int(bar_width * percent)
        bar = '█' * filled_width + '─' * (bar_width - filled_width)
        progress_bar = f"[{bar}]"

    icon = get_status_icon(status, player_name)
    output_text = f"{icon} {artist} - {title} {progress_bar}".strip()
    
    output = {"text": output_text, "tooltip": f"{artist} - {title}", "class": player_name.lower()}
    print_line(json.dumps(output))


def on_playback_status_changed(player, status):
    format_output(player)

def on_metadata_changed(player, metadata):
    format_output(player)

def on_player_appeared(manager, name):
    # When a new player appears, we can choose to switch to it
    # For now, we just restart the main logic to pick it up if it's the first one
    if not manager.props.player_names or manager.props.player_names[0].name == name.name:
         main()

def on_player_vanished(manager, player):
    print_line(json.dumps({"text": ""}))

if __name__ == "__main__":
    main() 