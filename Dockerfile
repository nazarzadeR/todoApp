FROM node:19

WORKDIR /usr/src/todoBack

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 8080

CMD [ "node", "dist/src/main.js" ]