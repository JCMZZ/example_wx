#!/bin/bash
cd `dirname $0`
DEPLOY_DIR=`pwd`
CONF_DIR=$DEPLOY_DIR/conf

PIDS=`ps -f | grep java | grep "$CONF_DIR" |awk '{print $2}'`
if [ -z "$PIDS" ]; then
    echo "ERROR: The server does not started!"
    exit 1
fi

echo -e "Stopping  ...\c"
for PID in $PIDS ; do
    kill $PID > /dev/null 2>&1
done

COUNT=0
while [ $COUNT -lt 1 ]; do    
    echo -e ".\c"
    sleep 1 
    PIDSN=`ps -f | grep java | grep "$CONF_DIR" |awk '{print $2}'`
	if [ -n "$PIDSN" ]; then
    	COUNT=0
	else
		COUNT=1
		break
	fi
done

echo "OK!"
echo "PID: $PIDS"

