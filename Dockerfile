FROM node:16.10.0-alpine3.14 as builder

RUN apk update \
    && apk add --no-cache --upgrade ca-certificates

WORKDIR /usr/src/app

COPY package.json package-lock.json /usr/src/app/
RUN npm ci

ARG NODE_ENV=production

COPY . /usr/src/app

CMD ["sh", "build-and-package.sh"]
