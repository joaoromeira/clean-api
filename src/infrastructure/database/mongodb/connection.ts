import mongoose from 'mongoose';
import { logger } from '@logger';

const { MONGODB_URI } = process.env;

interface Connect {
  onSuccess?: () => void;
  onError?: () => void;
}

export const connect = async (args?: Connect) => {
  await mongoose.connect(MONGODB_URI, {
    autoIndex: true,
  });

  const database = mongoose.connection;

  database.once('open', async () => {
    logger.info('Connected to database');
    args?.onSuccess();
  });

  database.on('error', () => {
    logger.error('Error connecting to database');
    args?.onError();
  });
};

export const disconnect = () => {
  mongoose.disconnect();
};
