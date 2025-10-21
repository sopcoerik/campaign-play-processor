import { Worker } from 'bullmq';
import { processEvent } from './bg_process';
import { client, REDIS_CONFIG } from './redis';


client.connect().catch(err => console.error("Failed to connect primary client in worker:", err));

new Worker('Events', async job => {
  if (job.name === 'event') {
    await processEvent(job.data);
  }
}, {
  connection: {
    host: REDIS_CONFIG.host,
    port: REDIS_CONFIG.port,
  }
});