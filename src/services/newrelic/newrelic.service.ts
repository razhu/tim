import newrelic = require('newrelic');
import { truncate } from 'lodash';
import yn from 'yn';
import { log } from '../../logger';
import {
  EnrichmentTimProcessingError,
  EnrichmentTimProcessingSample,
  NEW_RELIC_EVENT_TYPES,
  NEW_RELIC_GROUP,
} from './newrelic.definition';
const ATTRIBUTE_MAX_LENGTH = 255;
const { NEW_RELIC_BACKGROUND_TRANSACTION, NEW_RELIC_BACKGROUND_TRANSACTION_COVERAGE_PERCENT, NEW_RELIC_ENABLED } =
  process.env;

export class NewRelicService {
  sendProcessingSampleEvent(event: EnrichmentTimProcessingSample): void {
    if (!yn(NEW_RELIC_ENABLED)) return;
    newrelic.recordCustomEvent(NEW_RELIC_EVENT_TYPES.PROCESSING_SAMPLE, { ...event });
  }

  sendProcessingErrorEvent(event: EnrichmentTimProcessingError): void {
    if (!yn(NEW_RELIC_ENABLED)) return;
    const { error, ...attributes } = event;
    newrelic.recordCustomEvent(NEW_RELIC_EVENT_TYPES.PROCESSING_ERROR, {
      error: truncate(error, { length: ATTRIBUTE_MAX_LENGTH }),
      ...attributes,
    });
  }

  async startBackgroundTransaction(topic: string, asyncCallback: Function): Promise<void> {
    const probability = (n: number) => !!n && Math.random() <= n / 100;
    const percentage = Number(NEW_RELIC_BACKGROUND_TRANSACTION_COVERAGE_PERCENT) || 0;

    if (!yn(NEW_RELIC_ENABLED)) {
      await asyncCallback();
    } else if (yn(NEW_RELIC_BACKGROUND_TRANSACTION) && probability(percentage)) {
      return newrelic.startBackgroundTransaction(topic, NEW_RELIC_GROUP, function () {
        return new Promise(function (resolve, reject) {
          asyncCallback()
            .then(() => resolve())
            .catch((error: Error) => reject(error));
        });
      });
    }
  }

  shutdownAndCollectData(callback: Function): void {
    newrelic.shutdown({ collectPendingData: true, timeout: 10000 }, (error) => {
      if (error) {
        log.error(`New Relic shutdown error when collecting pending data`, error);
      }
      callback();
    });
  }
}
