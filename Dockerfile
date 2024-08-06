# syntax=docker/dockerfile:1
FROM node:18-alpine
RUN apk add --no-cache python3 g++ make
WORKDIR /app
COPY . .
RUN yarn install
CMD ["node", "src/index.js"]