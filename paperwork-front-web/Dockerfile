FROM node:16

WORKDIR /usr/app/

COPY . .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]