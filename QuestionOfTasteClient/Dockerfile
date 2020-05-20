FROM node:12.4.0

WORKDIR /opt/qot/question-of-taste-client
COPY package.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH" 

RUN ng build --prod
COPY ./dist .

FROM nginx:stable-alpine

RUN apk add --no-cache openssl curl
ENV DOCKERIZE_VERSION v0.6.1
RUN curl -L https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz --output dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN mkdir -p /var/log/nginx
RUN rm -rf /etc/nginx/conf.d/
RUN mkdir -p /etc/nginx/conf.d/

ENV NGINX_ADDITIONAL_FILES_PATH /etc/nginx/conf.d
ENV NGINX_LOGS_FILES_PATH /var/log/nginx

COPY nginx.conf.template /etc/nginx

RUN mkdir -p /var/run

CMD dockerize -template /etc/nginx/nginx.conf.template:/etc/nginx/nginx.conf \
    && cat /etc/nginx/nginx.conf \
    && nginx -g 'daemon off;'