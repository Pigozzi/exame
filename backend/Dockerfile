FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run knex:migrate

EXPOSE 3333

CMD ["npm", "run", "dev"]