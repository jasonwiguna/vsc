FROM node:16-alpine As development

WORKDIR /usr/src/app/vsc-backend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app/vsc-backend

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/vsc-backend/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]