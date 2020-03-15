FROM node:12-alpine
WORKDIR /app
COPY pwa/dist ./dist
COPY pwa-serve .

RUN npm i

ENTRYPOINT [ "node", "app" ]