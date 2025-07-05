# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:$HOME/.local/bin:/usr/local/bin:$PATH

# Path to your Oh My Zsh installation.
export ZSH="$HOME/.oh-my-zsh"

# Use default theme (set in Oh My Zsh)
ZSH_THEME="robbyrussell"

# Uncomment to update automatically
# zstyle ':omz:update' mode auto

# Plugin list — only git is active from Oh My Zsh, others via Zinit
plugins=(git)

# Load Oh My Zsh
source $ZSH/oh-my-zsh.sh

# Set history behavior
HISTSIZE=5000
HISTFILE=~/.zsh_history
SAVEHIST=$HISTSIZE
HISTDUP=erase
setopt appendhistory
setopt sharehistory

# Keybind mode
bindkey -e

# Setup fzf
eval "$(fzf --zsh)"

# fzf theme
export FZF_DEFAULT_OPTS=" \
--color=bg+:#3c3836,bg:#282828,spinner:#d3869b,hl:#fb4934 \
--color=fg:#ebdbb2,header:#fb4934,info:#83a598,pointer:#d3869b \
--color=marker:#b8bb26,fg+:#ebdbb2,prompt:#83a598,hl+:#fb4934 \
--color=selected-bg:#504945 \
--color=border:#3c3836,label:#ebdbb2"
export FZF_TAB_COLORS='fg:#ebdbb2,bg:#282828,hl:#fb4934,min-height=5'

# Setup zinit
ZINIT_HOME="${ZDOTDIR:-$HOME}/.zinit/bin"
if [[ ! -f $ZINIT_HOME/zinit.zsh ]]; then
  mkdir -p "$ZINIT_HOME"
  git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
fi
source "$ZINIT_HOME/zinit.zsh"

# Load zsh plugins with zinit
zinit light zsh-users/zsh-syntax-highlighting
zinit light zsh-users/zsh-completions
zinit light zsh-users/zsh-autosuggestions
zinit light Aloxaf/fzf-tab
# zinit light hgaiser/gruvbox-zsh
# ZSH_THEME=""

# Completion config
autoload -Uz compinit && compinit
zstyle ':completion:*' matcher-list 'm:{A-Za-z}={A-Za-z}'
zstyle ':completion:*' list-colors "${(s.:.)LS_COLORS}"
zstyle ':completion:*' menu no
zstyle ':fzf-tab:*' use-fzf-default-opts yes
zstyle ':fzf-tab:*' fzf-flags --height=17
zstyle ':fzf-tab:complete:*' fzf-preview '
if [ -d "$realpath" ]; then
    eza --icons --tree --level=2 --color=always "$realpath"
elif [ -f "$realpath" ]; then
    bat -n --color=always --line-range :500 "$realpath"
fi'

# Setup aliases
alias ls='eza --icons --color=always'
alias ll='eza --icons --color=always -al'
alias la='eza --icons --color=always -a'
alias lla='eza --icons --color=always -la'
alias lt='eza --icons --color=always -a --tree --level=1'
alias grep='grep --color=always'
alias vim='nvim'
alias cbonsai='cbonsai -l -i -w 1'

# Personal aliases
alias ff='cd && clear && fastfetch'
alias clock='tty-clock -s -c -t -r -n -C 3'
alias clear="cd && clear && fastfetch"
alias update="sudo pacman -Syyu"
alias udpate="sudo pacman -Syuu"
alias zedit="nano ~/.zshrc"
alias syncdots="sh ~/.config/hypr/scripts/backup_to_github.sh"
alias grub-update="sudo grub-mkconfig -o /boot/grub/grub.cfg"
alias editgrub="sudo nano /etc/default/grub"
alias logout="hyprctl dispatch exit"
alias kittythemes="kitty +kitten themes --reload-in=all"

# Bat setup
export BAT_THEME="base16"
alias bat='bat --paging=never'

# Zoxide
eval "$(zoxide init zsh)"

# Show system info at startup
fastfetch

# End of .zshrc
