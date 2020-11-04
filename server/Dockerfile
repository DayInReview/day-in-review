# Dockerfile for server

FROM node:10.16-alpine

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

# Expose port
EXPOSE 5000

CMD [ "npm", "start" ]