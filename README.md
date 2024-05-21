# Getting Started with Express.js

This project was bootstrapped with [Express application generator](https://expressjs.com/en/starter/generator.html).

## Application Setup

Before you start running the application, you need to set up the environment variables.
You need to create `.env` file in the root of the project. You can add there variables from [.env.sample](.env.sample) file.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

The page will reload when you make changes. 

### `npm run build`

Builds the app for production to the `dist` folder.
It bundles the app in production mode and optimizes the build for the best performance.

### `npm start`

Start serving built app from the `dist` folder in the production mode.

## Run project in Docker

You can run api together with database in docker compose.

For running docker-compose, run the following command:

```bash
docker-compose build && docker-compose up
```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).