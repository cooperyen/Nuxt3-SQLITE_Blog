# build stage
FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run server

RUN npm ci --only=dev

CMD [ "node", ".output/server/index.mjs" ]

EXPOSE 3000
