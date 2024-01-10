import express, { Express } from 'express';

const app: Express = express();

app.use(express.json()); // parse body to json

export default app;
