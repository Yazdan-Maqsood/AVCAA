// Placeholder for BullMQ setup
// Note: Install `bullmq` and `ioredis` if you decide to use this.
/*
import { Queue } from 'bullmq';
import { config } from '../config/env.js';

export const analysisQueue = new Queue('code-analysis', {
  connection: {
    host: config.redis?.host || '127.0.0.1',
    port: config.redis?.port || 6379,
  },
});
*/
export const analysisQueue = null; 