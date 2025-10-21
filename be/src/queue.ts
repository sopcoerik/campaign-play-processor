import { Queue, QueueEvents } from 'bullmq';
import { REDIS_CONFIG } from './redis';


export const queue = new Queue('Events', {
  connection: {
    host: REDIS_CONFIG.host,
    port: REDIS_CONFIG.port,
  },
});

const queueEvents = new QueueEvents('Events');

queueEvents.on('completed', ({ jobId}) => {
  console.log('Event processed:\n', jobId);
});

queueEvents.on(
  'failed',
  ({ jobId, failedReason }: { jobId: string; failedReason: string }) => {
    console.error('error processing:\n', failedReason, '\nfor job id:\n', jobId);
  },
);