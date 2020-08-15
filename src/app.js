import express from 'express';
import * as Sentry from '@sentry/node';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';

import { createGlobalVariableForGameData } from './utils/shared.utils';
import routes from './routes';

dotenv.config();

const app = express();

Sentry.init({ dsn: process.env.SENTRY_DSN });

app.use(Sentry.Handlers.requestHandler());
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());

const setCache = (req, res, next) => {
  // here you can define period in second, this one is 5 minutes
  const period = process.env.CACHE_TIME || 60 * 5;

  // you only want to cache for GET requests
  if (req.method === 'GET') {
    res.set('Cache-control', `public, max-age=${period}, max-stale=${period}`);
  } else {
    // for the other requests set strict no caching parameters
    res.set('Cache-control', `no-store, no-cache, max-age=0`);
  }

  // remember to call next() to pass on the request
  next();
};

app.use(setCache);

app.use('/v1/operators', routes.operators);
app.use('/v1/building', routes.building);
app.use('/v1/tags', routes.tags);

app.use(Sentry.Handlers.errorHandler());

// create global variable for game data
createGlobalVariableForGameData();

export default app;
