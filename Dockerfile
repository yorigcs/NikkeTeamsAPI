FROM node:18

RUN apt-get install bash

USER node

WORKDIR /home/node/app