import express from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';

import dotenv from 'dotenv';
import cors from 'cors';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import CommonRoutesConfig from './common/common.routes.config';
import UserRoutes from './users/users.routes.config';

dotenv.config();

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT; // default port to listen
const routes: Array<CommonRoutesConfig> = [];

app.use(bodyparser.json());

app.use(cors());

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
}));

routes.push(new UserRoutes(app));

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
}));

// define a route handler for the default home page
app.get('/', (req, res) => {
  res.status(200).send('Hello les amis !');
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  routes.forEach((route: CommonRoutesConfig) => {
    console.log(`Routes configured for ${route.getName()}`);
  });
});
