FROM node:22
LABEL authors="Viktoriia Shvets"

WORKDIR /file-upload-api/
COPY . .
RUN npm install
COPY . ./
RUN npm run build
CMD [ "npm", "start" ]
EXPOSE 3001