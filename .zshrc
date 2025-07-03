# Created by Phunt_Vieg_
# autoload -Uz zsh-newuser-install
# zsh-newuser-install -f# Lines configured by zsh-newuser-install

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# For setting history length see HISTSIZE and HISTFILESIZE in bash(1)
# History
HISTSIZE=5000
HISTFILE=~/.zsh_history
SAVEHIST=$HISTSIZE
HISTDUP=erase
setopt appendhistory
setopt sharehistory

# Keybind
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

# End of lines configured by zsh-newuser-install
# The following lines were added by compinstall
zstyle :compinstall filename "$HOME/.zshrc"

# Set the directory we want to store zinit and plugins
ZINIT_HOME="${ZDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"

# Download Zinit, if it's not there yet
if [ ! -d "$ZINIT_HOME" ]; then
    mkdir -p "$(dirname $ZINIT_HOME)"
    git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
fi

# Source/Load zinit
source "${ZINIT_HOME}/zinit.zsh"

# Add in zsh plugins
zinit light zsh-users/zsh-syntax-highlighting
zinit light zsh-users/zsh-completions
zinit light zsh-users/zsh-autosuggestions
zinit light Aloxaf/fzf-tab

# Load completions
autoload -Uz compinit && compinit
# End of lines added by compinstall

zinit cdreplay -q

# Completion styling
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
fi
'

# Setup alias
alias ls='eza --icons --color=always'
alias ll='eza --icons --color=always -l'
alias la='eza --icons --color=always -a'
alias lla='eza --icons --color=always -la'
alias lt='eza --icons --color=always -a --tree --level=1'
alias grep='grep --color=always'
alias vim='nvim'
alias cbonsai='cbonsai -l -i -w 1'

# MY ALIAS
alias ff='cd && clear && fastfetch'
alias clock='tty-clock -s -c -t -r -n -C 7'
alias clear="cd && clear && fastfetch"
alias update="sudo pacman -Syyu"
alias udpate="sudo pacman -Syuu"
alias zedit="nano ~/.zshrc"
alias syncdots="sh ~/CascadeProjects/backup_script/backup_to_github.sh"
alias grub-update="sudo grub-mkconfig -o /boot/grub/grub.cfg"
alias editgrub="sudo nano /etc/default/grub"
alias logout="hyprctl dispatch exit"

# Setup bat (better than cat)
export BAT_THEME="base16"
alias bat='bat --paging=never'

# Setup zoxide (better than cd)
eval "$(zoxide init zsh)"

fastfetch

#pokemon-colorscripts --no-title -s -r

# Initialize Oh My Posh
eval "$(oh-my-posh init zsh --config ~/.config/ohmyposh/viet.omp.json)"
export PATH=$HOME/.local/bin:$PATH
