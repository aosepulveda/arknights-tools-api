FROM node:10.15.3-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY ./src ./src
COPY .babelrc ./

EXPOSE 4000 4000
