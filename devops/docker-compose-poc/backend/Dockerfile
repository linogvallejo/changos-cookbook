# syntax=docker/dockerfile:1

FROM node:18
ENV NODE_ENV=production

WORKDIR /backend

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "server.js" ]