import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const handleInputErrores = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let errores = validationResult(req);

  if (!errores.isEmpty()) {
    res.status(400).json({ errors: errores.array() });
    return;
  }

  next();
};
