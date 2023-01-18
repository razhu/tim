import 'newrelic';
import { log } from './logger';
import { DocumentDBService } from './services/documentDB/documentDBservice';
import { Kafka } from './kafka/kafka';

(async function main() {
  try {
    log.info('Starting worker...');
    await Promise.all([DocumentDBService.connect(), Kafka.connect()]);
    log.info('Worker started.');
  } catch (error) {
    log.error('Error ocurred starting worker', error);
    await Kafka.disconnect();
    await DocumentDBService.disconnect();
    process.exit(1);
  }
})();
