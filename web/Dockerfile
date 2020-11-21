FROM node:12-alpine
ENV PATH /app/node_modules/.bin:$PATH
RUN mkdir /app
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install -g create-react-app
RUN npm install
COPY . /app
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD [ "serve", "-l", "3000", "-s", "build"]