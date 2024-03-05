import cors from 'cors';
import 'reflect-metadata';
import App from './app';
import logger from './middlewares/logger.middleware';
import { env } from './env';
import { AuthRouter } from './routes/auth.route';

const app = new App({
  port: env.port,
  middlewares: [logger(), cors({ credentials: true, origin: env.dbHost })],
  controllers: [
    new AuthRouter()
  ],
});

app.listen();
