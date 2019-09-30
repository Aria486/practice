#!/bin/sh
# https://docs.docker.com/compose/startup-order/

set -e

host="$1"
shift
cmd="$@"

# hostにcurlを投げたときのHTTP Status Codeが200になるまで待機
until test $(curl -LI ${host} -o /dev/null -w '%{http_code}' -s) -eq 200;do
    >&2 echo "Container is unavailable - sleeping"
    sleep 1
done

>&2 echo "Container is up - executing command"
exec $cmd
