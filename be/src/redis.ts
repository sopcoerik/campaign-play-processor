import { createClient } from 'redis';

export const REDIS_CONFIG = {
  url: 'redis://localhost:6379',
  host: '127.0.0.1',
  port: 6379
};

export const client = createClient({
  url: REDIS_CONFIG.url,
});

client.on('error', err => console.log('Redis Client Error', err));