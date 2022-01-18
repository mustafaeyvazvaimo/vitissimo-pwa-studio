FROM node:12-alpine3.12

COPY .env \
     .graphqlconfig \
     babel.config.js \
     Dockerfile \
     local-intercept.js \
     package.json \
     template.html \
     upward.yml \
     webpack.config.js \
	 yarn.lock \
	 /var/www/

COPY src/ /var/www/src

WORKDIR /var/www

RUN apk add --no-cache --virtual .build-deps curl git ca-certificates wget
RUN yarn --no-cache && \
  	yarn build

CMD ["yarn", "start"]