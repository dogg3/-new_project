FROM mhart/alpine-node


WORKDIR /app

COPY ./public/ ./public/
COPY package.json .
COPY yarn.lock .
COPY ./src/ ./src/




RUN yarn
RUN yarn build

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

CMD ["serve", "-s" ,"build", "-l", "3000"]

