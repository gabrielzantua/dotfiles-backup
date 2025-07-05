#!/usr/bin/env bash
set -euo pipefail

# Start ssh-agent if not already running, and add key once
if [ -z "${SSH_AUTH_SOCK:-}" ]; then
  eval "$(ssh-agent -s)"
  if ! ssh-add "$HOME/.ssh/id_ed25519"; then
    echo "[!] Failed to add SSH key. Ensure your key exists and passphrase is correct." >&2
    exit 1
  fi
fi

REPO_DIR="$HOME/github_backup"
REMOTE_URL="https://github.com/gabrielzantua/dotfiles-backup.git"

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

CLEAN_MODE=false
if [[ "${1:-}" == "--clean" ]]; then
  CLEAN_MODE=true
  echo "[+] Clean mode enabled: removed files will also be deleted from backup."
fi

mkdir -p "$REPO_DIR"
cd "$REPO_DIR"

if [ ! -d .git ]; then
  echo "[+] Initialising git repository in $REPO_DIR"
  git init
  git remote add origin "$REMOTE_URL"
fi

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

  if [ -z "$(git symbolic-ref --quiet HEAD)" ]; then
    git checkout -b main
  fi

  git commit -m "$commit_msg"

  echo "[+] Pushing to $REMOTE_URL"
  if ! git push -u origin $(git symbolic-ref --short HEAD || echo main); then
    echo "[!] Push failed. Check your network or credentials."
    exit 1
  fi

  git gc --prune=now --aggressive
else
  echo "[+] No changes to commit. Backup up to date."
fi
