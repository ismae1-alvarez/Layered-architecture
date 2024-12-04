import { Router } from 'express';
import authRouter from '../api/auth/auth.routes';

export class AppRoutes {
  static get routes(): Router {
    const routes = Router();

    // Router Auth
    routes.use(authRouter);

    return routes;
  }
}
