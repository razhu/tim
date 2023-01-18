import { KafkaMessage as Message } from 'kafkajs';
import { TOPICS } from '../config/topic.config';
import { Logger } from '../logger';
import { OPERATIONS } from './kafka.definition';

export class KafkaMessage {
  public model: TOPICS = null;
  public state: object = null;
  public operationType: OPERATIONS = null;
  constructor(topic: string, message: Message, logger: Logger) {
    try {
      const { model, state, operationType } = JSON.parse(message.value.toString());
      this.state = state;
      this.model = model;
      this.operationType = operationType;
    } catch (err) {
      logger.error('incorrect data for topic', err, { topic, messageRaw: message });
    }
  }
}
