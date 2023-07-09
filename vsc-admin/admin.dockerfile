# adapted from: https://github.com/BretFisher/node-docker-good-defaults
FROM node:16-slim AS base

WORKDIR /usr/src/app/vsc-admin
COPY package.json yarn.lock ./
RUN yarn
COPY . .

RUN yarn build

EXPOSE 8081

ENV PORT 8081

CMD ["yarn", "start"]