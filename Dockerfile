FROM node:18-alpine

WORKDIR /home/app

COPY . ./

RUN npm i --force

EXPOSE 3333

CMD ["npm", "run", "dev"]