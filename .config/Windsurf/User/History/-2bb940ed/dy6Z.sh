#!/usr/bin/env bash
set -euo pipefail
set -x  # Echo every command executed for verbosity

# Helper function to both print to stdout and send a desktop notification (if available)
notify() {
  local msg="$*"
  builtin echo "$msg"
  if command -v notify-send >/dev/null; then
    notify-send "Backup to GitHub" "$msg"
  fi
}

shopt -s expand_aliases
alias echo='notify'

REPO_DIR="$HOME/github_backup"
REMOTE_URL="https://github.com/gabrielzantua/dotfiles-backup.git"

PATHS=(
  ".bashrc"
  ".config"
  ".local/bin"
  ".gtkrc-2.0"
  ".icons"
  ".zsh_history"
  ".zshrc"
  "CascadeProjects/backup_script/backup_to_github.sh"
)

EXCLUDES=(
  "--exclude=.config/Windsurf/"
  "--exclude=.config/BraveSoftware/"
)

CLEAN_MODE=false
if [[ "${1:-}" == "--clean" ]]; then
  CLEAN_MODE=true
  echo "[+] Clean mode enabled: will delete files not in path list."
fi

mkdir -p "$REPO_DIR"

# AskPass setup for GUI
if [[ -n "${DISPLAY:-}" ]]; then
  if command -v ssh-askpass >/dev/null; then
    export SSH_ASKPASS="$(command -v ssh-askpass)"
  elif command -v zenity >/dev/null; then
    ASKPASS_SCRIPT="$(mktemp)"
    cat >"$ASKPASS_SCRIPT" <<'EOF'
#!/usr/bin/env bash
export GTK_THEME=gruvbox-dark-gtk
zenity --password --title="Enter SSH Passphrase"
EOF
    chmod +x "$ASKPASS_SCRIPT"
    export SSH_ASKPASS="$ASKPASS_SCRIPT"
    trap 'rm -f "$ASKPASS_SCRIPT"' EXIT
  elif command -v yad >/dev/null; then
    ASKPASS_SCRIPT="$(mktemp)"
    cat >"$ASKPASS_SCRIPT" <<'EOF'
#!/usr/bin/env bash
export GTK_THEME=gruvbox-dark-gtk
yad --entry --hide-text --title="Enter SSH Passphrase"
EOF
    chmod +x "$ASKPASS_SCRIPT"
    export SSH_ASKPASS="$ASKPASS_SCRIPT"
    trap 'rm -f "$ASKPASS_SCRIPT"' EXIT
  else
    echo "[!] No graphical password prompt available."
  fi

  if [[ -n "${SSH_ASKPASS:-}" ]]; then
    export GIT_ASKPASS="$SSH_ASKPASS"
    export SSH_ASKPASS_REQUIRE=force
    alias git='setsid git'
    echo "[+] Graphical passphrase prompt enabled via $SSH_ASKPASS"
  fi
fi

if [ ! -d "$REPO_DIR/.git" ]; then
  echo "[+] Cloning repository..."
  setsid git clone --branch master "$REMOTE_URL" "$REPO_DIR"
fi

cd "$REPO_DIR"

echo "[+] Pulling latest changes from remote..."
git fetch origin master
git checkout master || git checkout -b master
git reset --hard origin/master

# Sync files and track paths
keep_paths=()
for p in "${PATHS[@]}"; do
  src="$HOME/$p"
  if [ -e "$src" ]; then
    keep_paths+=("$p")
    if [ "$CLEAN_MODE" = true ]; then
      rsync -a --delete "${EXCLUDES[@]}" "$src" "$REPO_DIR/"
    else
      rsync -a "${EXCLUDES[@]}" "$src" "$REPO_DIR/"
    fi
  else
    echo "[!] Skipping $p (not found)"
  fi

done

if [ "$CLEAN_MODE" = true ]; then
  echo "[+] Cleaning files not in PATHS list..."
  mapfile -t all_files < <(cd "$REPO_DIR" && find . -type f ! -path "./.git/*")
  for file in "${all_files[@]}"; do
    # Normalize path
    relative_path="${file#./}"
    keep=false
    for keep_item in "${keep_paths[@]}"; do
      if [[ "$relative_path" == "$keep_item" || "$relative_path" == "$keep_item"/* ]]; then
        keep=true
        break
      fi
    done
    if [ "$keep" = false ]; then
      echo "[+] Deleting $relative_path"
      git rm -rf --cached "$relative_path"
      rm -rf "$REPO_DIR/$relative_path"
    fi
  done
fi

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
