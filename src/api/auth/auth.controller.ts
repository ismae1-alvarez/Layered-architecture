import { NextFunction, Request, Response } from 'express';
import { UserService } from './auth.services';

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

const asyncWrapper = (handler: AsyncHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ error: error.message || 'Hubo un error' });
    }
  };
};

export class AuthController {
  static createAccount = asyncWrapper(async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    const result = await UserService.createAccount({ email, password, name });

    res.status(201).json(result);
  });

  static login = asyncWrapper(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await UserService.loginAccount({ email, password });

    res.status(200).json(result);
  });

  static user = asyncWrapper(async (req: Request, res: Response) => {
    res.status(200).json({ message: req.user });
    return;
  });

  /**Profile */
  static updateProfile = asyncWrapper(async (req: Request, res: Response) => {
    const { email, name } = req.body;
    const user = req.user!;

    const result = await UserService.updateProfileAccount(
      { email, name },
      user,
    );

    res.status(200).json(result);
  });
}
