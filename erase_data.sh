#!/bin/bash

docker-compose down --remove-orphans
for i in $(docker volume ls |grep examplejavascriptapi|awk '{print $2;}');do docker volume rm $i -f;done
for i in $(docker ps -a |grep examplejavascriptapi|awk '{print $1;}');do docker rm $i -f;done
for i in $(docker images |grep examplejavascriptapi|awk '{print $3;}');do docker rmi $i -f;done
