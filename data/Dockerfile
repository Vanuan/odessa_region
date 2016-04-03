FROM iron/node:withnpm

RUN apk update && apk upgrade && apk add tini

ENTRYPOINT ["tini", "--"]

WORKDIR /src

COPY npm-shrinkwrap.json .
COPY package.json .
RUN npm install

COPY download.sh .
RUN chmod +x download.sh


COPY *.js ./
