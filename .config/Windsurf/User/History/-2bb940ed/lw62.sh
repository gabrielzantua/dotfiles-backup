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
#   2. Run it whenever you want to back up, or add it to cron/systemd timer.
# -----------------------------------------------------------------------------
set -euo pipefail

# ----- CONFIGURATION ----------------------------------------------------------
# Location of the local backup git repository.
REPO_DIR="$HOME/github_backup"

# URL of your remote GitHub repository (HTTPS for better LFS reliability)
REMOTE_URL="https://github.com/gabrielzantua/dotfiles-backup.git"

# List of file patterns that should be stored with Git LFS
LFS_PATTERNS=(
  "*.jpg" "*.jpeg" "*.png" "*.gif" "*.webp" "*.svg"
  "*.mp4" "*.mkv" "*.mov" "*.avi"
  "*.mp3" "*.flac" "*.wav"
  "*.zip" "*.tar" "*.gz" "*.7z"
  "*.iso" "*.AppImage"
)

# Files/directories to back up (relative to $HOME)
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

mkdir -p "$REPO_DIR"
cd "$REPO_DIR"

# Initialise Git repo if missing
if [ ! -d .git ]; then
  echo "[+] Initialising git repository in $REPO_DIR"
  git init
  git remote add origin "$REMOTE_URL"
fi

# Ensure git-lfs is available
if ! command -v git-lfs >/dev/null 2>&1; then
  echo "[!] git-lfs is not installed. Please install it (e.g. 'pacman -S git-lfs') and rerun this script."
  exit 1
fi

git lfs install --local --force

# Track LFS patterns
for pattern in "${LFS_PATTERNS[@]}"; do
  git lfs track "$pattern"
done

# Make sure .gitattributes is added to repo
git add .gitattributes

# Pull to prevent conflicts
if git ls-remote --exit-code origin &>/dev/null; then
  git pull --rebase origin $(git symbolic-ref --short HEAD || echo main) || true
fi

# Sync files using rsync
echo "[+] Syncing files..."
for p in "${PATHS[@]}"; do
  src="$HOME/$p"
  if [ -e "$src" ]; then
    rsync -a --delete "$src" "$REPO_DIR/"
  else
    echo "[!] Skipping $p (not found)"
  fi
done

# Stage and commit changes
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