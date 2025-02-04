# create docker container for Node.js app
FROM node:alpine
# place Node.js app will be copied and run inside the container
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install   
# dcoker will install dependencies by reading the files above we provided
COPY . .
EXPOSE 3000
CMD ["npm", "run", "devStart"]