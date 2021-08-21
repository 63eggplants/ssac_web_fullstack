#!/bin/bash

print_try(){
    echo "Try 'start -h' for more information"
    exit 1
}

print_help(){
    echo "usge: start { nginx | mysql }" 
    exit 1 
}

if [ $# -ne 1 ]; then
    print_try
    exit 1
fi

case $1 in 
    mysql)
        `/usr/bin/systemctl start mysqld`;;
    nginx)
        `/usr/bin/systemctl start nginx`;;
    -h)
        print_help;;
    *)
        print_try;;        
esac



