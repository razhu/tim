import { EachMessagePayload, KafkaMessage as KafkajsMessage } from 'kafkajs';
import uniqid from 'uniqid';
import { TOPICS } from '../config/topic.config';
import { Logger } from '../logger';
import { NewRelicService } from '../services/newrelic/newrelic.service';
import { ProcessorErrorEvent } from './events/processor-error/processor-error.event';
import { ProcessorSampleEvent } from './events/processor-sample/processor-sample.event';
import { KafkaMessage } from './kafka-message';
import { DatInsuranceSchema, Message } from './kafka.definition';
import { EnrichmentTimKafka } from './tim/tim.kafka';
import { TimProcessor } from './tim/tim.processor';

export class Kafka {
  static async connect() {
    await EnrichmentTimKafka.consumer.subscribe({ topic: TOPICS.TIM_SINGLE_MODEL });
    await EnrichmentTimKafka.consumer.run({ eachMessage: this.eachEnrichmentTimMessage });
  }

  static async disconnect() {
    await EnrichmentTimKafka.disconnect();
  }

  static async eachEnrichmentTimMessage(payload: EachMessagePayload): Promise<void> {
    const logger = new Logger({ component: 'tim-kafka', topic: payload.topic, processingId: uniqid() });
    const message = new KafkaMessage(payload.topic, payload.message, logger) as Message<DatInsuranceSchema>;

    if (payload.topic === TOPICS.TIM_SINGLE_MODEL) {
      await Kafka.processMessage(payload.topic, message, payload.message, new TimProcessor(message, logger), logger);
    } else {
      logger.error(`Unsupported topic '${payload.topic}'`, null, {
        topic: payload.topic,
        messageRaw: message,
      });
    }
  }

  static async processMessage(
    topic: string,
    data: KafkaMessage,
    message: KafkajsMessage,
    processor: TimProcessor,
    logger: Logger,
    newRelicService = new NewRelicService()
  ) {
    try {
      await newRelicService.startBackgroundTransaction(topic, processor.exec.bind(processor));
      const event = new ProcessorSampleEvent(topic, data);
      newRelicService.sendProcessingSampleEvent(event);
    } catch (err) {
      logger.error(`Error processing message for topic '${topic}':`, err, { messageRaw: message, topic: topic });
      const event = new ProcessorErrorEvent(topic, message, err);
      newRelicService.sendProcessingErrorEvent(event);
    }
  }
}
