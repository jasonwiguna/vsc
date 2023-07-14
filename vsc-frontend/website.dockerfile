# adapted from: https://github.com/BretFisher/node-docker-good-defaults
FROM node:16-slim AS base

WORKDIR /usr/src/app/vsc-frontend
COPY package.json yarn.lock ./
RUN yarn
COPY . .

RUN yarn build

EXPOSE 8080

ENV PORT 8080

CMD ["yarn", "start"]