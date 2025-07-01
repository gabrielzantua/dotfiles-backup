#!/usr/bin/env bash
# -----------------------------------------------------------------------------
# backup_to_github.sh
# -----------------------------------------------------------------------------
# A simple Bash script that backs up a set of personal files & directories to a
# GitHub repository. It copies the configured paths from your $HOME directory
# into a local git repository, then commits & pushes any changes.
#
# HOW TO USE
#   1. Make the script executable:  chmod +x backup_to_github.sh
#   2. Run it whenever you want to back up:
#        ./backup_to_github.sh         # normal sync (no deletion)
#        ./backup_to_github.sh --clean # sync and delete removed files
# -----------------------------------------------------------------------------
set -euo pipefail

# ----- CONFIGURATION ----------------------------------------------------------
REPO_DIR="$HOME/github_backup"
REMOTE_URL="https://github.com/gabrielzantua/dotfiles-backup.git"

LFS_PATTERNS=(
  "*.jpg" "*.jpeg" "*.png" "*.gif" "*.webp" "*.svg"
  "*.mp4" "*.mkv" "*.mov" "*.avi"
  "*.mp3" "*.flac" "*.wav"
  "*.zip" "*.tar" "*.gz" "*.7z"
  "*.iso" "*.AppImage"
)

PATHS=(
  ".bashrc"
  ".config"
  ".gtkrc-2.0"
  ".icons"
  ".vscode-oss"
  ".windsurf"
  ".zsh_history"
  ".zshrc"
  "Desktop"
  "Documents"
  "Downloads"
  "Music"
  "Videos"
)
# -----------------------------------------------------------------------------

# Parse optional --clean flag
CLEAN_MODE=false
if [[ "${1:-}" == "--clean" ]]; then
  CLEAN_MODE=true
  echo "[+] Clean mode enabled: removed files will also be deleted from backup."
fi

mkdir -p "$REPO_DIR"
cd "$REPO_DIR"

# Initialise Git repo if missing
if [ ! -d .git ]; then
  echo "[+] Initialising git repository in $REPO_DIR"
  git init
  git remote add origin "$REMOTE_URL"
fi

if ! command -v git-lfs >/dev/null 2>&1; then
  echo "[!] git-lfs is not installed. Please install it (e.g. 'pacman -S git-lfs') and rerun this script."
  exit 1
fi

git lfs install --local --force

for pattern in "${LFS_PATTERNS[@]}"; do
  git lfs track "$pattern"
done

git add .gitattributes

if git ls-remote --exit-code origin &>/dev/null; then
  git pull --rebase origin $(git symbolic-ref --short HEAD || echo main) || true
fi

echo "[+] Syncing files..."
for p in "${PATHS[@]}"; do
  src="$HOME/$p"
  if [ -e "$src" ]; then
    if [ "$CLEAN_MODE" = true ]; then
      rsync -a --delete "$src" "$REPO_DIR/"
    else
      rsync -a "$src" "$REPO_DIR/"
    fi
  else
    echo "[!] Skipping $p (not found)"
  fi
done

git add -A
if ! git diff --cached --quiet; then
  commit_msg="Backup: $(date '+%Y-%m-%d %H:%M:%S')"
  echo "[+] Committing changes: $commit_msg"
  if git rev-parse --quiet --verify HEAD >/dev/null; then
    git commit --amend -m "$commit_msg"
  else
    git commit -m "$commit_msg"
  fi

  echo "[+] Pushing to $REMOTE_URL"
  if ! git push --force -u origin $(git symbolic-ref --short HEAD || echo main); then
    echo "[!] Push failed. Check your network or credentials."
    exit 1
  fi

  git gc --prune=now --aggressive
else
  echo "[+] No changes to commit. Backup up to date."
fi
