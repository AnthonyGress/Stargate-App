FROM --platform=linux/amd64 node:16.20.1-slim

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

EXPOSE 8080

COPY . .

CMD [ "node", "server.js" ]
