FROM node:12-alpine
WORKDIR /app
COPY pwa-serve .
RUN rm -r dist
COPY pwa/dist ./dist

RUN npm i

ENTRYPOINT [ "node", "app" ]
