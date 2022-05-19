FROM ubuntu

COPY package*.json ./

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y npm

WORKDIR /usr/app

RUN npm install

COPY . . 

EXPOSE 3000

CMD ["npm", "run", "dev"]