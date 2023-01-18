import { expect } from 'chai';
import { createSandbox, SinonSandbox, SinonStub } from 'sinon';
import { ProcessorSampleEvent } from './processor-sample.event';

const topic = 'test';
const message = { state: {}, operationType: null } as any;

describe('/src/kafka/events/processor-sample/processor-sample.event.ts', () => {
  let sandbox: SinonSandbox;
  let messageStateStub: SinonStub;
  let messageOperationTypeStub: SinonStub;
  let event: ProcessorSampleEvent;
  beforeEach(async () => {
    sandbox = createSandbox();
    messageStateStub = sandbox.stub(message, 'state');
    messageOperationTypeStub = sandbox.stub(message, 'operationType');
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('should be `entityId` field of `ProcessorSampleEvent` instance', () => {
    event = new ProcessorSampleEvent(topic, message);
    expect(event).to.be.property('entityId');
    expect(event.entityId).to.be.eq(null);
  });
  it('should be `operationType` of `ProcessorSampleEvent` instance', () => {
    event = new ProcessorSampleEvent(topic, message);
    expect(event).to.be.property('operationType');
    expect(event.operationType).to.be.eq(null);
  });
  it('should be `topic` of `ProcessorSampleEvent` contain instance', () => {
    event = new ProcessorSampleEvent(topic, message);
    expect(event).to.be.property('topic');
    expect(event.topic).to.be.equal(topic);
  });
  it('should be `entityId` equal null', () => {
    event = new ProcessorSampleEvent(topic, message);
    expect(event.entityId).to.be.equal(null);
  });
  it('should be `entityId` contain value', () => {
    messageStateStub.value({ id: 'id' });
    event = new ProcessorSampleEvent(topic, message);
    expect(event.entityId).to.be.equal('id');
  });
  it('should be `operationType` contain value', () => {
    messageOperationTypeStub.value('operationTestType');
    event = new ProcessorSampleEvent(topic, message);
    expect(event.operationType).to.be.equal('operationTestType');
  });
});
