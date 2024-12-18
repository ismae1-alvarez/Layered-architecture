import mongoose from 'mongoose';
import { exit } from 'node:process';
import { envs } from './envs';
import { logger } from './logger';

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(envs.DATABASE);
    const url = `${connection.host} : ${connection.port}`;
    logger.info(`MogoDB Conectado en : ${url}`);
  } catch (error) {
    logger.error(`Hubo un error al conectar a MongoDB: ${error}`);
    exit(1);
  }
};
