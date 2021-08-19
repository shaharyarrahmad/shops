FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY . .
RUN yarn install --production

# Run the web service on container startup.
CMD [ "yarn", "start" ]
