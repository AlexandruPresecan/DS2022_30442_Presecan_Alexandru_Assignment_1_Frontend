#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install ngx-cookie-service --force
RUN npm install bootstrap --force
RUN npm install devextreme --force
RUN npm install --force
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist /usr/share/nginx/html