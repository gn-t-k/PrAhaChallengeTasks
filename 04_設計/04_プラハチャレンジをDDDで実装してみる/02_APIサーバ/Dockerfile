FROM node:14.16.0

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY prisma ./prisma

RUN yarn prisma generate

EXPOSE 3000

CMD [ "yarn", "run", "dev" ]
