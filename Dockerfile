FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
EXPOSE 8080
CMD [ "node", "index.tsx" ]