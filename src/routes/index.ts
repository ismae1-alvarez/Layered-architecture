import { Router } from 'express';
import authRouter from '../api/auth/auth.routes';
import { Request, Response } from 'express';

export class AppRoutes {
  static get routes(): Router {
    const routes = Router();

    // Ejemplo de api, solo puro ejemplo
    routes.get('/', (_req: Request, res: Response) => {
      res.send('hola desde mi API'); 
    }); 
    // Router Auth

    routes.use(authRouter);

    return routes;
  }
}
