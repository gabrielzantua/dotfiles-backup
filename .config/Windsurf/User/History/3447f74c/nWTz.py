#!/usr/bin/env python3

import os
import sys
import numpy as np

# === CONFIGURABLE ===
device_dpi = 2000
sample_point_count = 100
acceleration = 0.37
exponent = 2.0
sensitivity = 1.0
output_cap = 2.0

# === GET DEVICE ===
if len(sys.argv) < 2:
    print("Usage: ./script.py <device_name>")
    sys.exit(1)

device = sys.argv[1]

# === RAW ACCEL FORMULA ===
def rawaccel_classic(speed):
    return min(acceleration * (speed ** exponent), output_cap) * sensitivity

# === GENERATE POINTS ===
speeds_in_s = np.linspace(0, 8, sample_point_count)
speeds_counts_per_ms = speeds_in_s * (device_dpi / 1000)
sample_y = [rawaccel_classic(v) for v in speeds_in_s]
sample_str = " ".join(f"{v:.3f}" for v in sample_y)
step = speeds_counts_per_ms[1] - speeds_counts_per_ms[0]

# === APPLY TO HYPRLAND ===
def hyprctl(device, option, arg):
    print(f"Setting device[{device}]:{option} => {arg}")
    code = os.system(f"hyprctl keyword 'device[{device}]:{option}' '{arg}'")
    if code != 0:
        print("[ERROR] Failed to apply config. Check if the device name is correct.")
        sys.exit(1)

hyprctl(device, "accel_profile", f"custom {step} {sample_str}")
