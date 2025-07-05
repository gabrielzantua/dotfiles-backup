#!/usr/bin/env python3

import os
import sys
import numpy as np

# ==== RAW ACCEL CLASSIC CURVE CONFIGURATION ====
device_dpi = 1000
sample_point_count = 100
acceleration = 0.37
exponent = 2.0
sensitivity = 100.0
output_cap = 2.0

# Validate input
if len(sys.argv) < 2:
    print("Usage: <script> <device name>")
    sys.exit(1)

device = sys.argv[1]

# === GENERATE SAMPLE POINTS ===
# Range: simulate 0 to 8 in/s converted to counts/ms
input_speeds_in_s = np.linspace(0, 8, sample_point_count)
counts_per_ms = input_speeds_in_s * (device_dpi / 1000)

# Apply Raw Accel classic formula
def rawaccel_classic(speed_in):
    return min(acceleration * speed_in ** exponent, output_cap) * sensitivity

sample_points_y = [rawaccel_classic(v) for v in input_speeds_in_s]
sample_points_str = " ".join(["%.3f" % y for y in sample_points_y])
step = counts_per_ms[1] - counts_per_ms[0]

# === APPLY TO HYPRLAND ===
def hyprctl(device, option, arg):
    os.system(f"hyprctl keyword 'device[{device}]:{option}' '{arg}'")

print(f"\nSetting Raw Accel Classic Curve for device: {device}")
print(f"Step size: {step:.6f}")
print(f"Accel points: {sample_points_str}\n")

hyprctl(device, 'accel_profile', f'custom {step} {sample_points_str}')
