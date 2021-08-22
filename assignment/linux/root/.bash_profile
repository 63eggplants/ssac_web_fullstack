# .bash_profile

# Get the aliases and functions
if [ -f ~/.bashrc ]; then
	. ~/.bashrc
fi

# User specific environment and startup programs

PATH=$PATH:$HOME/bin

export PATH
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"
alias ll='ls -al'
alias l='ls -l'

alias datefmt='/root/bin/datefmt2.sh'
alias start='/root/bin/start.sh'
alias stop='/root/bin/stop.sh'
alias restart='/root/bin/restart.sh'

