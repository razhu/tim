import { logLevel } from 'kafkajs';
const { ENRICHMENT_MSK_BROKERS, COMPANY_KAFKA_GROUP_ID } = process.env;

export class TIM_KAFKA_CONFIGS {
  public static BROKERS = String(ENRICHMENT_MSK_BROKERS).split(',');
  public static LOG_LEVEL = logLevel.ERROR;
  public static GROUP_ID = COMPANY_KAFKA_GROUP_ID;
}
