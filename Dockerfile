FROM node:8
MAINTAINER "moalmeida" <moalmeida@koinosystems.com>

RUN mkdir -p /app
WORKDIR /app

COPY . /app
RUN npm install

CMD ["npm", "start"]
