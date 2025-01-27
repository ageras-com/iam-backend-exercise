import { logger } from '../utils/logger';
import { Event } from '../types';

/**
 * A handler that will receive transaction events
 *
 * @param {object} event - The received event from the queue
 * @param {object} event.eventId - The unique id of the event
 * @param {string} event.payload - The payload of the event
 * @param {number} event.retry - The number of retries (defaults to 0)
 * @returns {boolean} false if the event needs to be retried, else true
 */
export const handle = async (event: Event) => {
  try {
    logger.info('Event received', event);

    // TODO: event handling logic

    return true;
  } catch (err) {
    return false;
  }
};
