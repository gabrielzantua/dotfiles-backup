#!/usr/bin/env python

import json
import sys
import os
import base64
import tempfile
import urllib.parse
import dbus
from dbus.mainloop.glib import DBusGMainLoop
from gi.repository import GLib

# Initialize DBus
DBusGMainLoop(set_as_default=True)
session_bus = dbus.SessionBus()

def get_album_art(metadata):
    """Extract album art from metadata and return as base64 or path"""
    try:
        if 'mpris:artUrl' in metadata:
            art_url = str(metadata['mpris:artUrl'])
            if art_url.startswith('file://'):
                return art_url[7:]  # Remove file:// prefix
            elif art_url.startswith('http'):
                # For web URLs, you might want to download and cache the image
                # This is a simplified version that just returns the URL
                return art_url
        # Try to get from metadata directly
        elif 'microsoft.com' in str(metadata.get('mpris:trackid', '')):
            # Special handling for Microsoft apps (like Edge/Spotify Web)
            return None
    except Exception as e:
        print(f"Error getting album art: {e}", file=sys.stderr)
    return None

def print_line(line):
    """
    Prints a line to stdout and flushes the buffer.
    """
    sys.stdout.write(line + '\n')
    sys.stdout.flush()

def format_time(seconds):
    """Convert seconds to MM:SS format"""
    if not seconds:
        return "00:00"
    minutes = int(seconds // 60)
    seconds = int(seconds % 60)
    return f"{minutes:02d}:{seconds:02d}"

def download_thumbnail(url, cache_dir='~/.cache/waybar-thumbnails'):
    import os
    import urllib.request
    import hashlib
    
    if not url or not url.startswith('http'):
        return None
    
    # Create cache directory if it doesn't exist
    cache_dir = os.path.expanduser(cache_dir)
    os.makedirs(cache_dir, exist_ok=True)
    
    # Generate a unique filename based on the URL
    filename = hashlib.md5(url.encode('utf-8')).hexdigest() + ".jpg"
    filepath = os.path.join(cache_dir, filename)
    
    # If file already exists and is recent (less than 1 hour old), use it
    if os.path.exists(filepath) and (time.time() - os.path.getmtime(filepath)) < 3600:
        return filepath
    
    try:
        # Download the thumbnail
        urllib.request.urlretrieve(url, filepath)
        return filepath
    except Exception as e:
        print(f"Error downloading thumbnail: {e}", file=sys.stderr)
        return None

def get_media_info():
    try:
        players = session_bus.list_names()
        for player in players:
            if 'org.mpris.MediaPlayer2' in player:
                try:
                    proxy = session_bus.get_object(player, '/org/mpris/MediaPlayer2')
                    properties = dbus.Interface(proxy, 'org.freedesktop.DBus.Properties')
                    
                    # Get player status
                    status = str(properties.Get('org.mpris.MediaPlayer2.Player', 'PlaybackStatus')).lower()
                    
                    # Get metadata
                    metadata = properties.Get('org.mpris.MediaPlayer2.Player', 'Metadata')
                    
                    # Skip if no metadata
                    if not metadata:
                        continue
                        
                    # Extract artist and title
                    artist = 'Unknown Artist'
                    if 'xesam:artist' in metadata and metadata['xesam:artist']:
                        artist = str(metadata['xesam:artist'][0])
                        # Clean up common suffixes
                        artist = artist.replace(' - Topic', '')
                    
                    title = str(metadata.get('xesam:title', 'Unknown Title'))
                    album_art_url = metadata.get('mpris:artUrl', '')
                    
                    # Download and get local path of the thumbnail
                    thumbnail_path = None
                    if album_art_url:
                        thumbnail_path = download_thumbnail(str(album_art_url))
                    
                    # Get position and duration if available
                    position = 0
                    duration = 0
                    try:
                        position = int(properties.Get('org.mpris.MediaPlayer2.Player', 'Position')) / 1000000  # Convert to seconds
                        duration = int(metadata.get('mpris:length', 0)) / 1000000  # Convert to seconds
                    except Exception as e:
                        print(f"Error getting position/duration: {e}", file=sys.stderr)
                    
                    progress = (position / duration * 100) if duration > 0 else 0
                    
                    # Determine player name
                    player_name = 'brave' if 'brave' in player.lower() else player.split('.')[-1].lower()
                    
                    return {
                        'artist': artist,
                        'title': title,
                        'album_art': thumbnail_path if thumbnail_path else '',
                        'status': status,
                        'position': position,
                        'duration': duration,
                        'progress': progress,
                        'alt': player_name
                    }
                    
                    # Skip if we get here somehow
                    continue
                    
                except Exception as e:
                    print(f"Error processing player {player}: {e}", file=sys.stderr)
                    continue
                    
    except Exception as e:
        print(f"Error getting media info: {e}", file=sys.stderr)
        return None

def get_status_icon(status, player_name):
    if player_name and "spotify" in player_name.lower():
        player_icon = ""
    elif player_name and "brave" in player_name.lower():
        player_icon = ""
    else:
        player_icon = "🎜"
    if status == Playerctl.PlaybackStatus.PLAYING:
        return f"{player_icon}"
    if status == Playerctl.PlaybackStatus.PAUSED:
        return f""
    return ""

def escape_html(text):
    """Escape special characters for HTML output"""
    if not text:
        return ""
    return str(text).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;').replace("'", '&#039;')

def generate_tooltip(media_info):
    """Generate a simple tooltip with media info"""
    title = escape_html(media_info.get('title', 'Unknown Title'))
    artist = escape_html(media_info.get('artist', 'Unknown Artist'))
    return f"{artist} - {title}"

def main():
    try:
        media_info = get_media_info()
        if not media_info:
            print_line(json.dumps({
                "text": "No media",
                "class": "stopped",
                "alt": "no-media"
            }))
            return
        
        # Get player status
        status = media_info.get('status', 'stopped').lower()
        if status == 'paused':
            status_class = 'paused'
        elif status == 'playing':
            status_class = 'playing'
        else:
            status_class = 'stopped'
        
        # Get media info
        artist = media_info.get('artist', 'Unknown Artist')
        title = media_info.get('title', 'Unknown Title')
        player_name = media_info.get('alt', 'default')
        album_art = media_info.get('album_art', '')
        
        # Create display text with just artist and title
        # Keep it short to fit in the bar
        max_length = 30  # Increased since we're not showing the icon
        
        # Create the basic text
        text = f"{artist} - {title}"
        
        # Truncate if too long
        if len(text) > max_length:
            text = text[:(max_length-3)] + "..."
            
        display_text = text
        
        # Prepare output
        output = {
            "text": display_text,
            "tooltip": f"{artist} - {title}",
            "class": f"media-player {status_class}",
            "alt": player_name,
            "markup": "none"
        }
        
        print_line(json.dumps(output))
        
    except Exception as e:
        print(f"Error in main: {e}", file=sys.stderr)
        print_line(json.dumps({
            "text": "Error",
            "class": "error",
            "alt": "error"
        }))

if __name__ == "__main__":
    main() 