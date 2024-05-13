FROM node:22
LABEL authors="Viktoriia Shvets"

WORKDIR /file-upload-api/
COPY . .
RUN npm install
CMD [ "npm", "start" ]
EXPOSE 3001