import 'dotenv/config.js';
import { logger } from '@src/vendor/logger';
import { connect, disconnect } from '../connection';

import { runFactory } from '../factory/factory';

const seed = async () => {
  await connect();
  logger.info('Seeding...');

  try {
    await runFactory();
    logger.info('Seeding are success!');
  } catch (error) {
    logger.info('Error when populate seeds');
  } finally {
    disconnect();
  }
};

seed();
