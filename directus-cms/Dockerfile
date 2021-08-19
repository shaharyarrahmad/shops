FROM node:14

# Create app directory
WORKDIR /usr/src/app
RUN apt-get install libc6

COPY . .
RUN yarn install --production

# Run the web service on container startup.
CMD [ "yarn", "start" ]
