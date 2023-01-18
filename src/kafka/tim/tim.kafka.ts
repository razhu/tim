import { Admin, Consumer, Kafka, Producer } from 'kafkajs';
import { TIM_KAFKA_CONFIGS } from '../../config/tim-kafka.config';

export class EnrichmentTimKafka {
  private static _instance: EnrichmentTimKafka;
  readonly producer: Producer;
  readonly consumer: Consumer;
  readonly admin: Admin;

  private constructor() {
    const kafka = new Kafka({ brokers: TIM_KAFKA_CONFIGS.BROKERS, logLevel: TIM_KAFKA_CONFIGS.LOG_LEVEL });
    this.producer = kafka.producer();
    this.consumer = kafka.consumer({ groupId: TIM_KAFKA_CONFIGS.GROUP_ID });
    this.admin = kafka.admin();
  }

  private static get instance(): EnrichmentTimKafka {
    if (!this._instance) this._instance = new EnrichmentTimKafka();
    return this._instance;
  }

  static get producer(): Producer {
    return this.instance.producer;
  }

  static get consumer(): Consumer {
    return this.instance.consumer;
  }

  static get admin(): Admin {
    return this.instance.admin;
  }

  static async connect(): Promise<void> {
    await this.producer.connect();
    await this.consumer.connect();
  }

  static async disconnect(): Promise<void> {
    await this.producer?.disconnect();
    await this.consumer?.disconnect();
  }
}
