import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    const error = new Error('No Autorizado');
    res.status(401).json({ error: error.message });
    return;
  }

  const token = bearer.split(' ')[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as jwt.JwtPayload;

    const user = await User.findById(decoded.id).select('_id name email');

    if (!user) {
      res.status(500).json({ error: 'Token no valido' });
    }

    req.user = user!;

    next();
  } catch (error) {
    res.status(500).json({ error: `Token No Valido ${ error }` });
  }
};