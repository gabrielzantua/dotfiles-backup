#!/usr/bin/env bash
# -----------------------------------------------------------------------------
# backup_to_github.sh
# -----------------------------------------------------------------------------
# A simple Bash script that backs up a set of personal files & directories to a
# GitHub repository.  It copies the configured paths from your $HOME directory
# into a local git repository, then commits & pushes any changes.
#
# HOW TO USE
#   1. Edit REMOTE_URL below with the SSH or HTTPS URL of your GitHub repo.
#      Example: git@github.com:yourname/dotfiles-backup.git
#   2. Make the script executable:  chmod +x backup_to_github.sh
#   3. Run it whenever you want to back up, or add it to cron/systemd timer.
# -----------------------------------------------------------------------------
set -euo pipefail

# ----- CONFIGURATION ----------------------------------------------------------
# Location of the local backup git repository.  Change if you prefer another
# directory.
REPO_DIR="$HOME/github_backup"

# URL of your remote GitHub repository (SSH or HTTPS).  **MUST be set**.
REMOTE_URL="https://github.com/gabrielzantua/dotfiles-backup.git"

# List of files/directories (relative to $HOME) that you want to back up.
PATHS=(
  ".bashrc"
  ".cache"
  ".config"
  ".gtkrc-2.0"
  ".icons"
  ".local"
  ".obsidianVault"
  ".vscode-oss"
  ".windsurf"
  ".zsh_history"
  ".zshrc"
  "Desktop"
  "Documents"
  "Downloads"
  "Music"
  "Pictures"
  "Videos"
)
# -----------------------------------------------------------------------------

# Create repo directory if it doesn't exist
mkdir -p "$REPO_DIR"
cd "$REPO_DIR"

# Initialise git repository on first run
if [ ! -d .git ]; then
  echo "[+] Initialising git repository in $REPO_DIR"
  git init
  git remote add origin "$REMOTE_URL"
fi

# Pull latest changes to avoid conflicts (fails gracefully if branch doesn't exist yet)
if git ls-remote --exit-code origin &>/dev/null; then
  git pull --rebase origin $(git symbolic-ref --short HEAD || echo master) || true
fi

echo "[+] Syncing files..."
for p in "${PATHS[@]}"; do
  src="$HOME/$p"
  if [ -e "$src" ]; then
    rsync -a --delete "$src" "$REPO_DIR/"  # keep directory/file name intact
  else
    echo "[!] Skipping $p (not found)"
  fi
done

# Stage & commit changes if any
git add -A
if ! git diff --cached --quiet; then
  commit_msg="Backup: $(date '+%Y-%m-%d %H:%M:%S')"
  echo "[+] Committing changes: $commit_msg"
  git commit -m "$commit_msg"
  echo "[+] Pushing to $REMOTE_URL"
  git push -u origin $(git symbolic-ref --short HEAD || echo master)
else
  echo "[+] No changes to commit. Backup up to date."
fi
