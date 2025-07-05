#!/usr/bin/env python3

# based on https://gist.github.com/fufexan/de2099bc3086f3a6c83d61fc1fcc06c9

import struct
import os
import sys
import math

# ===== PARAMETERS (Update these to match Raw Accel settings) =====
device_dpi = 800  # your actual mouse DPI in Windows
screen_dpi = 163         # your screen DPI
screen_scaling_factor = 1
sample_point_count = 20
sensitivity_factor = 3.0  # adjusted to match Raw Accel gain curve

# Raw Accel Settings (from screenshot):
# Sens Multiplier: 1
# Acceleration: 0.37
# Cap: 2.0
# Gain Enabled: True

# Sigmoid helps match the curve shape, we'll match it to acceleration value
acceleration_gain = 2.0
acceleration_factor = 12.0  # the higher this is, the sharper the curve (tweakable)

def sigmoid(x, a=acceleration_factor):
    return 1 / (1 + math.exp(-a * (x - 0.2)))  # shifted left to match sharp early rise

def find_arg(arg):
    for i in sys.argv:
        if i == arg:
            return True
    return False

def float16x16(num):
    return struct.unpack('<i', num[:-4])[0] / int(0xffff)

if find_arg("help") or find_arg("-h") or find_arg("--help") or find_arg("h"):
    print(f'{sys.argv[0]} <device>')
    print('To get the device, run `hyprctl devices` and get its name')
    exit(0)

if len(sys.argv) < 2:
    print("Error: device not specified. Usage: <script> <device>")
    exit(1)

device = sys.argv[1]

scale_x = device_dpi / 1e3
scale_y = screen_dpi / 1e3 / screen_scaling_factor * sensitivity_factor

# Default Windows acceleration curve points (Raw Accel linear = customizable)
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

windows_points = [[float16x16(x), float16x16(y)] for x, y in zip(X, Y)]
points = [[x * scale_x, y * scale_y] for x, y in windows_points]


def find2points(x):
    i = 0
    while i < len(points) - 2 and x >= points[i + 1][0]:
        i += 1
    assert -1e6 + points[i][0] <= x <= points[i + 1][0] + 1e6, f'{points[i][0]} <= {x} <= {points[i + 1][0]}'
    return points[i], points[i + 1]

def interpolate(x):
    (x0, y0), (x1, y1) = find2points(x)
    factor = sigmoid(x)
    y = factor * ((x - x0) * y1 + (x1 - x) * y0) / (x1 - x0)
    return min(y, acceleration_gain)  # Apply gain cap

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

print(f'\tPoints: {sample_points_str}')
print(f'\tStep size: {step:0.10f}')

def hyprctl(device, option, arg):
    os.system(f"hyprctl keyword 'device[{device}]:{option}' '{arg}'")

print(f"Setting device:'{device}':accel_profile using hyprctl")
hyprctl(device, 'accel_profile', f'custom {step} {sample_points_str}')
