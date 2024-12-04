import { Request, Response } from 'express';
import { UserService } from './auth.services';

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;

      const result = await UserService.createAccount({ email, password, name });

      res.status(201).json(result);
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ error: error.message || 'Hubo un error' });
    }
  };

  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const result = await UserService.loginAccount({ email, password });

      res.status(200).json(result);
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ error: error.message || 'Hubo un error' });
    }
  };

  static user = async (req: Request, res: Response) => {
    res.status(200).json({ message: req.user });
    return;
  };

  /**Profile */
  static updateProfile = async (req: Request, res: Response) => {
    const { email, name } = req.body;
    const user = req.user!;

    try {
      const result = await UserService.updateProfileAccount(
        { email, name },
        user,
      );

      res.status(200).json(result);
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ error: error.message || 'Hubo un error' });
    }
  };

  
}
