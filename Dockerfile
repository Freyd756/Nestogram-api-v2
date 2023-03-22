# Base image
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .

ENV DATABASE ''

EXPOSE 3000
#RUN npm run build


# Start the server using the production build
CMD [ "npm", "run", "start:dev"]
#CMD [ "node", "dist/main.js" ]
