FROM node:alpine

WORKDIR /Appv2

COPY . ./

COPY package*.json ./

RUN npm install -g npm@latest

RUN npm install --force
COPY . .

RUN npm run build

RUN ls -la

CMD ["npm", "start"]