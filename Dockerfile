


FROM node:16 AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/public /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
