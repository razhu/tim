import { expect } from 'chai';
import { SinonSpy, SinonStub, createSandbox } from 'sinon';
import { DocumentDBService } from '../src/services/documentDB/documentDBservice';
import { Kafka } from '../src/kafka/kafka';
import { log } from '../src/logger';

describe('/src/index.ts', () => {
  let sandbox = createSandbox();
  let documentDBConnectStub: SinonStub = sandbox.stub(DocumentDBService, 'connect');
  let kafkaConnectStub: SinonStub = sandbox.stub(Kafka, 'connect');
  let logInfoSpy: SinonSpy = sandbox.spy(log, 'info');

  before(() => {
    documentDBConnectStub.resolves();
    kafkaConnectStub.resolves();
    require('../src/index');
  });

  after(() => sandbox.restore());

  it('should start worker', () => {
    expect(logInfoSpy.firstCall.calledWith('Starting worker...')).to.be.true;
    expect(logInfoSpy.secondCall.calledWith('Worker started.')).to.be.true;
    expect(documentDBConnectStub.calledOnce).to.be.true;
    expect(kafkaConnectStub.calledOnce).to.be.true;
  });
});
