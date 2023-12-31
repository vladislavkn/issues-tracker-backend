FROM node:16-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache make gcc g++ python3 && \
  npm install glob rimraf && \
  npm rebuild bcrypt --build-from-source && \
  apk del make gcc g++ python3

COPY . .

RUN npm run build

FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]