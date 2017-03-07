# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# don't put duplicate lines or lines starting with space in the history.
# See bash(1) for more options
HISTCONTROL=ignoreboth

# append to the history file, don't overwrite it
shopt -s histappend

# for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
HISTSIZE=1000
HISTFILESIZE=2000

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# If set, the pattern "**" used in a pathname expansion context will
# match all files and zero or more directories and subdirectories.
#shopt -s globstar

# make less more friendly for non-text input files, see lesspipe(1)
[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

# set variable identifying the chroot you work in (used in the prompt below)
if [ -z "${debian_chroot:-}" ] && [ -r /etc/debian_chroot ]; then
    debian_chroot=$(cat /etc/debian_chroot)
fi

# set a fancy prompt (non-color, unless we know we "want" color)
case "$TERM" in
    xterm*) 
	PROMPT_COMMAND='echo “$(date +%Y-%m-%d.%H:%M:%S) $(history 1)” >> ~/tmp/bash-history-$(date +%Y-%m).log && \
                        echo -ne "\033]0;${PWD/$HOME/~} : ${TRTOP/$HOME/~}\007"'
	;;
esac

# Load the git-prompt code.
source ~/util/git-prompt.sh

PS1='\[\033[01;34m\]\w\[\033[00m\]$(__git_ps1 "(%s)")$ '

# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi

# some more ls aliases
alias gs='git status'

# Add an "alert" alias for long running commands.  Use like so:
#   sleep 10; alert
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'

# Alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.

if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi

# enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).
if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi

export JAVA_HOME=/usr/lib/jvm/java-8-oracle/jre/bin/java
export dgcutil=~/util
if [[ -z $BASE_PATH ]]; then
    export BASE_PATH=./:~/util:$PATH:$JAVA_HOME/bin:/usr/sbin:/sbin
fi
export PATH=$BASE_PATH             # Needed to put util in path.
export TMP=/tmp
export EDITOR="emacs -nw"
export LESS=-fR

# Set up an ID that is unique for each bash session but can be used by child processes.
# This is done so each bash session can create unique file names.
export BID=$$
# Set default time style for 'ls'
export TIME_STYLE=long-iso

export LESS_TERMCAP_mb=$(printf '\e[01;31m') # enter blinking mode - red
export LESS_TERMCAP_md=$(printf '\e[01;35m') # enter double-bright mode - bold, magenta
export LESS_TERMCAP_me=$(printf '\e[0m') # turn off all appearance modes (mb, md, so, us)
#export LESS_TERMCAP_se=$(printf '\e[0m') # leave standout mode
#export LESS_TERMCAP_so=$(printf '\e[01;30m') # enter standout mode
export LESS_TERMCAP_ue=$(printf '\e[0m') # leave underline mode
export LESS_TERMCAP_us=$(printf '\e[04;36m') # enter underline mode - cyan


# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# Make file globbing case-insensitive
shopt -s nocaseglob

# Enable ** expansion
shopt -s globstar

alias d='dir.rb'
alias dd='dir.rb -d'
alias ts='. ts.sh'
alias tse='. tse.sh'
alias tsr='. tsr.sh'
alias mcd='. mcd.sh'
alias xd='. xd.sh'
alias xdset='. xdset.sh'
alias cd..='cd ..'
alias cp='cp --interactive'
alias cds='. cds.sh'
alias grep='grep --color=auto'
alias calc='sh ~/util/bashcalc.sh'
alias awkcsv="gawk -v FPAT='([^,]+)|(\"[^\"]+\")'"

# Generic call of compgen using a prefix.
_compgen()
{
    local list=$1
    local prefix=$2
    local lth=${#prefix}
    local curw=${COMP_WORDS[COMP_CWORD]}
    COMPREPLY=()

    if [[ x$curw == "x" || x$curw == "x$prefix" ]]; then
        COMPREPLY=($list)
    else
        if [[ ${curw:0:$lth} == "$prefix" ]]; then
            curw=${curw:$lth}
	fi
        COMPREPLY=($(compgen -W "$list" -- "$prefix$curw"))

	# If COMPREPLY is empty then try again without the prefix.
	if [[ -z $COMPREPLY ]]; then
            COMPREPLY=($(compgen -W "$list" -- "$curw"))
       fi
    fi
    
}

# Set up tab completion for 'xd' command.
_xd()
{
    local wordlist=$(xdlist | awk '{print "@" $1}')
    _compgen "$wordlist" "@"
    return 0
}
complete -F _xd -o plusdirs -o nospace xd
