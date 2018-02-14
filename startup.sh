#!/bin/bash

if [ ! "$(docker ps -q -f name=traefik)" ]; then
  echo "run ops dependencies"
  curl https://raw.githubusercontent.com/moalmeida/example-ops/master/startup.sh | bash
fi

docker-compose down --remove-orphans
for i in $(docker ps -a |grep examplejavascriptapi|awk '{print $1;}');do docker rm $i -f;done
for i in $(docker images |grep examplejavascriptapi|awk '{print $3;}');do docker rmi $i -f;done
docker-compose pull
docker-compose up -d --build
docker-compose logs --follow
