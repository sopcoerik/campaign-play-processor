import { createClient } from 'redis';

export const client = createClient({
  username: process.env.REDIS_USERNAME || 'default',
  password: process.env.REDIS_PASSWORD || 'default',
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  }
});

client.on('error', err => console.log('Redis Client Error', err));