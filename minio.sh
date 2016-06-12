#!/bin/bash

# If not [file is not zero-sized]
if [[ ! -s package.json ]]; then
  echo "ERR! Must be run at the root of the repo!"
  exit 1
fi

data="./data"
minio="./minio"
platform="linux-amd64"

# If not [file is executable] or [file is directory]
if [[ ! -x "$minio" || -d "$minio" ]]; then
  echo \# Download minio
  url="https://dl.minio.io/server/minio/release/$platform/$minio"
  curl "$url" > "$minio"
  chmod +x "$minio"
fi

# If not [file is directory]
if [[ ! -d "$data" ]]; then
  echo \# Create data directory
  mkdir -p "$data"
fi

: ${MINIO_ACCESS_KEY:=$npm_package_config_access}
: ${MINIO_SECRET_KEY:=$npm_package_config_secret}

export MINIO_ACCESS_KEY
export MINIO_SECRET_KEY

echo \# Start minio in background
$minio server $data &
trap "kill %1" SIGINT SIGTERM

echo \# Waiting a second to check minio started right
sleep 1
jobs

if jobs %1; then
  echo \# Looks like it started alright
else
  echo \# Uh oh, something looks wrong

  if ps | grep -P "minio$"; then
    pid=$(ps | grep -P "minio$" | cut -d\  -f1)
    echo \# Looks like we have a stray minio: $pid
    kill $pid

    echo \# Trying again...
    exec $0 $@
  fi

  echo \# Could not recover, aborting...
  exit 1
fi

echo \# Run the provided command
echo \> $@
$@

status=$?
echo \> Exited: $status
echo \# Stop minio server
kill %1

echo \# Clean up data
rm -r "$data"

exit $status
