# build
FROM node:14.15.4-alpine3.12 as build
WORKDIR /app
COPY package*.json /app/

#RUN echo 104.16.24.35 registry.npmjs.org > /etc/hosts $$ cat /etc/hosts

RUN npm install

#RUN npm audit fix

COPY . /app

RUN npm run build

# production
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html/dist
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
