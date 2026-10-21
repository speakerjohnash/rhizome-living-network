#!/usr/bin/env python3
"""Check SHA-256 integrity for the Rhizome presentation archive."""
from __future__ import annotations

import hashlib
from pathlib import Path
import sys

root = Path(__file__).resolve().parents[1]
checksums = root / 'SHA256SUMS.txt'
errors = 0
checked = 0
for line in checksums.read_text(encoding='utf-8').splitlines():
    if not line.strip():
        continue
    checksum, path = line.split('  ', 1)
    target = root / path
    if not target.is_file():
        print(f'MISSING: {path}')
        errors += 1
        continue
    actual = hashlib.sha256(target.read_bytes()).hexdigest()
    if actual != checksum:
        print(f'MISMATCH: {path}')
        errors += 1
    else:
        checked += 1
        print(f'OK: {path}')
print(f'{checked} files verified; {errors} errors')
sys.exit(1 if errors else 0)
