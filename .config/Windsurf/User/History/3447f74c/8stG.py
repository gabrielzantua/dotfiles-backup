#!/usr/bin/env python3

import struct
import os
import sys
import math

# ==== CONFIGURABLE PARAMETERS ====
device_dpi = 800
screen_dpi = 90  # 1080p @ 24.5"
screen_scaling_factor = 1
sample_point_count = 50
sensitivity_factor = 1.0

# Device name must be passed as argument
if len(sys.argv) < 2:
    print("Usage: <script> <device name>")
    sys.exit(1)

device = sys.argv[1]

# Windows registry acceleration points
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

# Convert fixed-point 16.16 to float
def float16x16(num):
    return struct.unpack('<i', num[:-4])[0] / float(0x10000)

# Convert registry points to scaled values
windows_points = [[float16x16(x), float16x16(y)] for x, y in zip(X, Y)]
scale_x = device_dpi / 1000
scale_y = screen_dpi / 1000 / screen_scaling_factor * sensitivity_factor
points = [[x * scale_x, y * scale_y] for x, y in windows_points]

# Interpolation between points
def find2points(x):
    for i in range(len(points) - 1):
        if x < points[i + 1][0]:
            return points[i], points[i + 1]
    return points[-2], points[-1]  # fallback for edge case

def interpolate(x):
    (x0, y0), (x1, y1) = find2points(x)
    return ((x - x0) * (y1 - y0) / (x1 - x0)) + y0

# Sampling from curve
def sample_points(count):
    max_x = points[-2][0]  # don't exceed final point
    step = max_x / count
    sample_x = [i * step for i in range(count)]
    sample_y = [interpolate(x) for x in sample_x]
    return sample_x, sample_y, step

# Generate sample points
sample_x, sample_y, step = sample_points(sample_point_count)
sample_str = " ".join(f"{y:.3f}" for y in sample_y)

# Output summary
print(f"\nDevice: {device}")
print(f"Step size: {step:.6f}")
print(f"Accel points: {sample_str}\n")

# Apply to Hyprland
def hyprctl(device, option, arg):
    os.system(f"hyprctl keyword 'device[{device}]:{option}' '{arg}'")

hyprctl(device, 'accel_profile', f'custom {step} {sample_str}')
