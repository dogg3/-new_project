FROM node:13.12.0-alpine

# pull official base image
WORKDIR /app

# copy files
COPY ./public/ ./public/
# scopy files
COPY ./src/ ./src/

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --only=prod

RUN npm run build


CMD ["serve", "-s" ,"build", "-l", "3000"]

