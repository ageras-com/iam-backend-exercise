// DO NOT EDIT THIS FILE
import queue from 'queue';
import { logger } from './utils/logger';
import { EventProducer } from './producer';
import { handle } from './consumer';
import { Event } from './types';

const MAX_QUEUE_LENGTH = 20;
const INTERVAL_MS = 2000;

const createJob = (q: queue, event: Event) => () => new Promise<void>(async (resolve) => {
  const { type, payload, retry } = event;
  const ack = await handle(event);

  if (!ack) {
    logger.debug('Adding back event to the queue for retry', {
      type,
      payload,
      retry,
    });

    q.push(createJob(q, { ...event, retry: retry + 1 }));
  }

  resolve();
});

const main = async () => {
  logger.info('Initializing');
  const q = queue({ autostart: true, concurrency: 1 });
  q.start();

  const producer = new EventProducer();

  logger.info('Queue initialized');

  setInterval(() => {
    if (q.length < MAX_QUEUE_LENGTH) {
      try {
        q.push(createJob(q, producer.generateEvent()));
      } catch (error) {
        logger.info(`Generating next event (${error})`);
      }
    }
  }, INTERVAL_MS);
};

if (require.main === module) {
  main();
}
