FROM node:16

WORKDIR /usr/app/

COPY package.json .

COPY package-lock.json .

COPY public ./public

COPY src ./src

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]