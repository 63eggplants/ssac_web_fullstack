#!/bin/bash

SVC=$1

FLAG=0

print_try(){
    echo "Try 'restart -h' for more information"
    exit 1
}

print_help(){
    echo "usge: restart { nginx | mysql }"
    exit 1
}

print_start(){
    echo "Please start $SVC first"
}
    
check_started(){
    for i in `ps -ef | grep $SVC | awk '{print $1}'`; do
        if [ $i == $SVC ]; then
            FLAG=1
        fi
    done
}

check_nginx(){
    if [ `systemctl is-active nginx` == "active" ]; then
        `/usr/bin/systemctl restart nginx`
    else
        echo "If you want to restart nginx, please start nginx using systemctl"
    fi
}
if [ $# -ne 1 ]; then
    print_try
    exit 1
fi

case $1 in
    mysql)
        check_started
        if [ $FLAG -eq 1 ]; then
            `/usr/bin/systemctl restart mysqld`
        else
            print_start
        fi;;
    nginx)
        check_started
        if [ $FLAG -eq 1 ]; then
            check_nginx
        else
            print_start
        fi;;
    -h)
        print_help;;
    *)
        print_try;;
esac
