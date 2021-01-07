# Dockerfile for client

FROM node:10.16-alpine

# Set working directory
WORKDIR /usr/src/app

COPY package*.json ./

# Installing dependencies
RUN npm install --silent

# Copy files over
COPY . .

# Expose port
EXPOSE 3000

CMD [ "npm", "start" ]
