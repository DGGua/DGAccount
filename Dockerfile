FROM node:14
COPY ./ /app
WORKDIR /app
RUN yarn install && yarn build
RUN cp package.json build/package.json
RUN cp yarn.lock build/yarn.lock

FROM node:14
RUN mkdir /app
COPY --from=0 /app/build /app
WORKDIR /app
RUN yarn install --production
ENTRYPOINT [ "node", "/app/index.js" ]