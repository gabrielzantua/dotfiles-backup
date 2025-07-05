#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$HOME/github_backup"
REMOTE_URL="https://github.com/gabrielzantua/dotfiles-backup.git"

PATHS=(
  ".bashrc"
  ".config"
  ".gtkrc-2.0"
  ".icons"
  ".zsh_history"
  ".zshrc"
)

EXCLUDES=(
  "--exclude=.config/Windsurf/"
  "--exclude=.config/BraveSoftware/"
)

CLEAN_MODE=false
if [[ "${1:-}" == "--clean" ]]; then
  CLEAN_MODE=true
  echo "[+] Clean mode enabled: removed files will also be deleted from backup."
fi

mkdir -p "$REPO_DIR"

if [ ! -d "$REPO_DIR/.git" ]; then
  echo "[+] Cloning repository..."
  git clone --branch master "$REMOTE_URL" "$REPO_DIR"
fi

cd "$REPO_DIR"

echo "[+] Pulling latest changes from remote..."
git fetch origin master

git checkout master || git checkout -b master

git reset --hard origin/master

echo "[+] Syncing files..."
for p in "${PATHS[@]}"; do
  src="$HOME/$p"
  if [ -e "$src" ]; then
    if [ "$CLEAN_MODE" = true ]; then
      rsync -a --delete "${EXCLUDES[@]}" "$src" "$REPO_DIR/"
    else
      rsync -a "${EXCLUDES[@]}" "$src" "$REPO_DIR/"
    fi
  else
    echo "[!] Skipping $p (not found)"
  fi
done

# Explicitly remove excluded paths from the backup repo if they still exist
declare -a REMOVE_PATHS=(
  ".config/Windsurf"
  ".config/BraveSoftware"
)

for path in "${REMOVE_PATHS[@]}"; do
  if [ -e "$REPO_DIR/$path" ]; then
    echo "[+] Removing leftover excluded path: $path"
    rm -rf "$REPO_DIR/$path"
  fi
done

git add -A
if ! git diff --cached --quiet; then
  commit_msg="Backup: $(date '+%Y-%m-%d %H:%M:%S')"
  echo "[+] Committing changes: $commit_msg"
  git commit -m "$commit_msg"
  echo "[+] Pushing to $REMOTE_URL"
  git push origin master || {
    echo "[!] Push failed. Check your network or credentials."
    exit 1
  }
else
  echo "[+] No changes to commit. Backup up to date."
fi