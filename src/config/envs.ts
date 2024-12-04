import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  DATABASE: get('DATABASE_URL').required().asString(),
  JWT: get('JWT_SECRET').required().asString(),
};
