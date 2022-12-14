FROM node:14.5.0-alpine
WORKDIR /code

COPY ./code/package.json ./
COPY ./code/package-lock.json ./
RUN npm install
COPY ./code/ ./
ENV PORT=80

EXPOSE 80

CMD ["npm", "start"]