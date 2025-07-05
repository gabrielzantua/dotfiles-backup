#!/usr/bin/env python3

import struct
import os
import sys
import math

# ==== CONFIGURABLE PARAMETERS ====
device_dpi = 800
screen_dpi = 90  # assuming 1920x1080 @ 24.5"
screen_scaling_factor = 1
sample_point_count = 100
sensitivity_factor = 1.0  # reduced from 3.0 to reduce overshoot feel

# Device name as seen in `hyprctl devices`
if len(sys.argv) < 2:
    print("Usage: <script> <device name>")
    sys.exit(1)

device = sys.argv[1]

def float16x16(num):
    return struct.unpack('<i', num[:-4])[0] / int(0xffff)

# Windows registry points for acceleration curve
X = [
    b'\x00\x00\x00\x00\x00\x00\x00\x00',
    b'\x15\x6e\x00\x00\x00\x00\x00\x00',
    b'\x00\x40\x01\x00\x00\x00\x00\x00',
    b'\x29\xdc\x03\x00\x00\x00\x00\x00',
    b'\x00\x00\x28\x00\x00\x00\x00\x00',
]
Y = [
    b'\x00\x00\x00\x00\x00\x00\x00\x00',
    b'\xfd\x11\x01\x00\x00\x00\x00\x00',
    b'\x00\x24\x04\x00\x00\x00\x00\x00',
    b'\x00\xfc\x12\x00\x00\x00\x00\x00',
    b'\x00\xc0\xbb\x01\x00\x00\x00\x00',
]

# Convert raw registry values
windows_points = [[float16x16(x), float16x16(y)] for x, y in zip(X, Y)]
scale_x = device_dpi / 1000
scale_y = screen_dpi / 1000 / screen_scaling_factor * sensitivity_factor
points = [[x * scale_x, y * scale_y] for x, y in windows_points]

def find2points(x):
    i = 0
    while i < len(points) - 2 and x >= points[i + 1][0]:
        i += 1
    return points[i], points[i + 1]

def interpolate(x):
    (x0, y0), (x1, y1) = find2points(x)
    y = ((x - x0) * y1 + (x1 - x) * y0) / (x1 - x0)
    return y

def sample_points(count):
    last_point = -2
    max_x = points[last_point][0]
    step = max_x / (count + last_point)
    sample_points_x = [si * step for si in range(count)]
    sample_points_y = [interpolate(x) for x in sample_points_x]
    return sample_points_x, sample_points_y

sample_points_x, sample_points_y = sample_points(sample_point_count)
step = sample_points_x[1] - sample_points_x[0]
sample_points_str = " ".join(["%.3f" % number for number in sample_points_y])

print(f"\nSetting device: {device}")
print(f"Step size: {step:.6f}")
print(f"Accel points: {sample_points_str}\n")

# Apply to Hyprland
def hyprctl(device, option, arg):
    os.system(f"hyprctl keyword 'device[{device}]:{option}' '{arg}'")

hyprctl(device, 'accel_profile', f'custom {step} {sample_points_str}')
