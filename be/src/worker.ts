import { Worker } from 'bullmq';
import { io } from 'socket.io-client';
import { processEvent } from './bg_process';
import { client, REDIS_CONFIG } from './redis';


const socket = io('http://localhost:3000');
client.connect().catch(err => console.error("Failed to connect primary client in worker:", err));

export const campaignWorker = new Worker('Events', async job => {
  if (job.name === 'event') {
    await processEvent(job.data);

    socket.emit('workerUpdate', { status: 'processed' });
  }
}, {
  connection: {
    host: REDIS_CONFIG.host,
    port: REDIS_CONFIG.port,
  }
});