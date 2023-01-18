import { assert, expect } from 'chai';
import { EachMessagePayload, KafkaMessage } from 'kafkajs';
import { SinonStub, createSandbox } from 'sinon';
import { TOPICS } from '../../src/config/topic.config';
import { Kafka } from '../../src/kafka/kafka';
import { EnrichmentTimKafka } from '../../src/kafka/tim/tim.kafka';
import { TimProcessor } from '../../src/kafka/tim/tim.processor';
import { Logger } from '../../src/logger';
import { NewRelicService } from '../../src/services/newrelic/newrelic.service';
import { timModelMessage } from '../mocks/tim-model-message.mock';

describe('/src/kafka/kafka.ts', () => {
  const sandbox = createSandbox();
  let enrichmentTimKafkaConsumerSubscribeStub: SinonStub;
  let enrichmentTimKafkaConsumerRunStub: SinonStub;
  let timProcessorExecStub: SinonStub;
  let loggerErrorStub: SinonStub;
  let newRelicProcessingSampleEventStub: SinonStub;
  let newRelicProcessingErrorEventStub: SinonStub;
  let kafkaProcessMessageStub: SinonStub;

  beforeEach(() => {
    enrichmentTimKafkaConsumerSubscribeStub = sandbox.stub();
    enrichmentTimKafkaConsumerRunStub = sandbox.stub();
    kafkaProcessMessageStub = sandbox.stub(Kafka, 'processMessage');
    sandbox.stub(EnrichmentTimKafka, 'consumer').value({
      subscribe: enrichmentTimKafkaConsumerSubscribeStub,
      run: enrichmentTimKafkaConsumerRunStub,
    });
    timProcessorExecStub = sandbox.stub(TimProcessor.prototype, 'exec');
    newRelicProcessingSampleEventStub = sandbox.stub(NewRelicService.prototype, 'sendProcessingSampleEvent');
    newRelicProcessingErrorEventStub = sandbox.stub(NewRelicService.prototype, 'sendProcessingErrorEvent');
    loggerErrorStub = sandbox.stub(Logger.prototype, 'error');
    console.log(
      newRelicProcessingSampleEventStub === newRelicProcessingErrorEventStub,
      loggerErrorStub === timProcessorExecStub
    );
  });

  afterEach(() => sandbox.restore());

  describe('# Kafka `connect`', () => {
    it('should call `subscribe and run` methods of `EnrichmentTimKafka.consumer`', async () => {
      await Kafka.connect();
      expect(enrichmentTimKafkaConsumerSubscribeStub.calledOnceWith({ topic: TOPICS.TIM_SINGLE_MODEL })).to.be.true;
      expect(enrichmentTimKafkaConsumerRunStub.calledOnceWith({ eachMessage: Kafka.eachEnrichmentTimMessage })).to.be
        .true;
    });
  });

  describe('# Kafka `eachEnrichmentTimMessage`', () => {
    it('should call `Kafka.eachEnrichmentTimMessage` and `Kafka.processMessage` ', async () => {
      kafkaProcessMessageStub.resolves();
      await Kafka.eachEnrichmentTimMessage({
        topic: TOPICS.TIM_SINGLE_MODEL,
        message: { value: Buffer.from(JSON.stringify(timModelMessage)) } as Partial<KafkaMessage>,
      } as EachMessagePayload);
      assert.isTrue(kafkaProcessMessageStub.calledOnce);
      assert.equal(kafkaProcessMessageStub.args[0][0], TOPICS.TIM_SINGLE_MODEL);
      assert.deepEqual(kafkaProcessMessageStub.args[0][1], timModelMessage);
      assert.deepEqual(kafkaProcessMessageStub.args[0][2], { value: Buffer.from(JSON.stringify(timModelMessage)) });
      assert.instanceOf(kafkaProcessMessageStub.args[0][3], TimProcessor);
      assert.instanceOf(kafkaProcessMessageStub.args[0][4], Logger);
    });
  });

  describe('# Kafka `processMessage`', () => {
    xit('should call `Kafka.processMessage` and execute EnrichmentTimProcessor ', async () => {});
    xit('should call `Kafka.processMessage` and fails', async () => {});
  });
});
