import { expect } from 'chai';
import { createSandbox, SinonSandbox } from 'sinon';
import { ProcessorErrorEvent } from './processor-error.event';
// import { Exception } from '../../resolvers/exception';

const topic = 'test';
const message = { state: null } as any;

describe('/src/kafka/events/processor-error/processor-error.event.ts', () => {
  let sandbox: SinonSandbox;
  let event: ProcessorErrorEvent;
  beforeEach(async () => {
    sandbox = createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('should be `error` of `ProcessorErrorEvent` instance', async () => {
    event = new ProcessorErrorEvent(topic, message, new Error('test'));
    expect(event).to.be.property('error');
  });
  it('should be `error` equal error message', async () => {
    event = new ProcessorErrorEvent(topic, message, new Error('test'));
    expect(event.error).to.be.eq('test');
  });
  it('should be `error` equal error messages', async () => {
    // event = new ProcessorErrorEvent(topic, message, new Exception({ test: 'test' }, {}));
    expect(event.error).to.be.eq('{"test":"test"}');
  });
  it('should be `topic` of `ProcessorErrorEvent` instance', async () => {
    event = new ProcessorErrorEvent(topic, message, new Error('test'));
    expect(event).to.be.property('topic');
    expect(event.topic).to.be.eq('test');
  });
});
