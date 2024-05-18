FROM node:alpine
ENV NODE_ENV development


WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

#RUN yarn install
RUN npm i --force

# Copy app files
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]
