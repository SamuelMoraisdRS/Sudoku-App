FROM node

WORKDIR /usr

RUN apt-get update && apt-get install -y npm --no-install-recommends

COPY package*.json ./

RUN npm install

ADD ./public ./public

ADD ./src ./src

CMD [ "npm", "start" ]