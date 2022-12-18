FROM node:14.5.0-alpine AS build
WORKDIR /app
COPY ./code/package.json /app/package.json
COPY ./code/package-lock.json /app/package-lock.json
RUN npm install
COPY ./code /app
RUN npm run build

## nginx
FROM nginx:1.23.2
COPY --from=build /app/build /usr/share/nginx/html
COPY ./ssl/RCS.2M.crt /etc/nginx/ssl/RCS.2M.crt
COPY ./ssl/RCS.2M.key /etc/nginx/ssl/RCS.2M.key
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]