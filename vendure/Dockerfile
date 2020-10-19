# Use the official Node.js 10 image.
# https://hub.docker.com/_/node
FROM node:12-alpine

ENV NODE_ENV=production

# Create and change to the app directory.
WORKDIR /usr/src/app

ADD . /usr/src/app
RUN npm ci --only=production

# Run the web service on container startup.
CMD [ "npm", "run", "start" ]
