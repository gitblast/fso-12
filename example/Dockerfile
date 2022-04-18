FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

ENV DEBUG=example:*

USER node

CMD DEBUG=example:* npm start
