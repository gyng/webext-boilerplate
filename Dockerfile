FROM node:16.10.0-alpine3.14 as builder

RUN apk update \
    && apk add --no-cache --upgrade ca-certificates

WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/
RUN yarn install --frozen-lockfile \
    && yarn check --integrity \
    && yarn cache clean

ARG NODE_ENV=production

COPY . /usr/src/app

CMD ["sh", "build-and-package.sh"]
