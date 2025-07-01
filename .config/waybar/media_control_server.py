#!/usr/bin/env python3
import http.server
import socketserver
import subprocess
import json
from urllib.parse import urlparse, parse_qs

PORT = 8000

class MediaControlHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_url = urlparse(self.path)
        if parsed_url.path == '/control':
            query_components = parse_qs(parsed_url.query)
            cmd = query_components.get('cmd', [''])[0]
            if cmd in ['PlayPause', 'Next', 'Previous']:
                try:
                    subprocess.run(['playerctl', cmd], check=True)
                    self.send_response(200)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'status': 'success', 'command': cmd}).encode())
                except subprocess.CalledProcessError as e:
                    self.send_response(500)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'status': 'error', 'message': str(e)}).encode())
            else:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'status': 'error', 'message': 'Invalid command'}).encode())
        else:
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'error', 'message': 'Not found'}).encode())

def run_server():
    with socketserver.TCPServer(("", PORT), MediaControlHandler) as httpd:
        print(f"Serving at port {PORT}")
        httpd.serve_forever()

if __name__ == "__main__":
    run_server()
