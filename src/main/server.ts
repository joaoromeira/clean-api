import 'express-async-errors';
import 'dotenv/config.js';

import { connect } from '@db/connection';
import { logger } from '@logger';

import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(json());
app.use(cors());
app.use(routes);

app.use((error: Error, request: Request, response: Response) => {
  return response.json({ status: 'Error', message: error.message });
});

app.listen(Number(process.env.PORT || 4000), () =>
  logger.info(
    `🚀 Server ready at: Host ${process.env.HOST} Port ${process.env.PORT}`
  )
);

connect();
