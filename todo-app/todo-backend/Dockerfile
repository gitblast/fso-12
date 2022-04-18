FROM node:16

COPY --chown=node:node . .

RUN npm ci

USER node

CMD npm start