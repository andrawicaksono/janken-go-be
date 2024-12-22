FROM node:18

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g pm2

COPY . .

COPY migrations /usr/src/app/migrations
COPY migrate.sh /usr/src/app/migrate.sh

ENV NODE_ENV=production

RUN chmod +x /usr/src/app/migrate.sh

CMD ["sh", "-c", "/usr/src/app/migrate.sh && pm2 start npm --name 'app' -- start && pm2 logs"]
