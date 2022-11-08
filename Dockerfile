#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/DS2022_30442_Presecan_Alexandru_Assignment_1_Frontend /usr/share/nginx/html