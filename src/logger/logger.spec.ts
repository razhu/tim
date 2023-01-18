import { createSandbox, SinonStub } from 'sinon';
import { expect } from 'chai';
import { Logger } from './logger';
import { DatLogger } from '@dat/logger';
import * as helper from './logger.helper';

describe('/src/logger/logger.ts', () => {
  const sandbox = createSandbox();
  let datLoggerInfoStub: SinonStub;
  let datLoggerDebugStub: SinonStub;
  let datLoggerVerboseStub: SinonStub;
  let datLoggerWarnStub: SinonStub;
  let datLoggerErrorStub: SinonStub;
  let errorToMetadataStub: SinonStub;
  const message = 'some message';
  const defaultProps = { defaultProp1: 'defaultProp1' };
  const meta: object = { prop1: 'prop1', prop2: 'prop2' };

  beforeEach(() => {
    datLoggerInfoStub = sandbox.stub(DatLogger, 'info');
    datLoggerDebugStub = sandbox.stub(DatLogger, 'debug');
    datLoggerVerboseStub = sandbox.stub(DatLogger, 'verbose');
    datLoggerWarnStub = sandbox.stub(DatLogger, 'warn');
    datLoggerErrorStub = sandbox.stub(DatLogger, 'error');
    errorToMetadataStub = sandbox.stub(helper, 'errorToMetadata');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('# info', () => {
    it('logs info message via DatLogger lib', () => {
      const logger: Logger = new Logger();
      logger.info(message);

      expect(datLoggerInfoStub.calledOnce).to.be.true;
      expect(datLoggerInfoStub.firstCall.args).to.be.eql([message, {}]);
    });

    it('logs info message with metadata via DatLogger lib', () => {
      const logger: Logger = new Logger();
      logger.info(message, meta);

      expect(datLoggerInfoStub.calledOnce).to.be.true;
      expect(datLoggerInfoStub.firstCall.args).to.be.eql([message, { ...meta }]);
    });

    it('logs info message with default metadata', () => {
      const logger: Logger = new Logger(defaultProps);
      logger.info(message);

      expect(datLoggerInfoStub.calledOnce).to.be.true;
      expect(datLoggerInfoStub.firstCall.args).to.be.eql([message, { ...defaultProps }]);
    });
  });

  describe('# debug', () => {
    it('logs debug message via DatLogger lib', () => {
      const logger: Logger = new Logger();
      logger.debug(message);

      expect(datLoggerDebugStub.calledOnce).to.be.true;
      expect(datLoggerDebugStub.firstCall.args).to.be.eql([message, {}]);
    });

    it('logs debug message with metadata via DatLogger lib', () => {
      const logger: Logger = new Logger();
      logger.debug(message, meta);

      expect(datLoggerDebugStub.calledOnce).to.be.true;
      expect(datLoggerDebugStub.firstCall.args).to.be.eql([message, { ...meta }]);
    });
  });

  describe('# verbose', () => {
    it('logs verbose message via DatLogger lib', () => {
      const logger: Logger = new Logger();
      logger.verbose(message);

      expect(datLoggerVerboseStub.calledOnce).to.be.true;
      expect(datLoggerVerboseStub.firstCall.args).to.be.eql([message, {}]);
    });

    it('logs verbose message with metadata via DatLogger lib', () => {
      const logger: Logger = new Logger();
      logger.verbose(message, meta);

      expect(datLoggerVerboseStub.calledOnce).to.be.true;
      expect(datLoggerVerboseStub.firstCall.args).to.be.eql([message, { ...meta }]);
    });
  });

  describe('# warn', () => {
    it('logs warn message via DatLogger lib', () => {
      const logger: Logger = new Logger();
      logger.warn(message);

      expect(datLoggerWarnStub.calledOnce).to.be.true;
      expect(datLoggerWarnStub.firstCall.args).to.be.eql([message, {}]);
    });

    it('logs warn message with metadata via DatLogger lib', () => {
      const logger: Logger = new Logger();
      logger.warn(message, meta);

      expect(datLoggerWarnStub.calledOnce).to.be.true;
      expect(datLoggerWarnStub.firstCall.args).to.be.eql([message, { ...meta }]);
    });
  });

  describe('# error', () => {
    it('logs error message via DatLogger lib', () => {
      const logger: Logger = new Logger();
      logger.error(message);

      expect(datLoggerErrorStub.calledOnce).to.be.true;
      expect(datLoggerErrorStub.firstCall.args).to.be.eql([message, {}]);
    });

    it('logs error message with error details via DatLogger lib', () => {
      const error: Error = new Error('some error');
      const errorProps = { errorName: 'Error', errorMessage: 'someError', stackTrace: 'stackTrace' };
      errorToMetadataStub.withArgs(error).returns(errorProps);

      const logger: Logger = new Logger();
      logger.error(message, error);

      expect(datLoggerErrorStub.calledOnce).to.be.true;
      expect(datLoggerErrorStub.firstCall.args).to.be.eql([message, { ...errorProps }]);
    });

    it('logs error message with metadata and error details via DatLogger lib', () => {
      const error: Error = new Error('some error');
      const errorProps = { errorName: 'Error', errorMessage: 'someError', stackTrace: 'stackTrace' };
      errorToMetadataStub.withArgs(error).returns(errorProps);

      const logger: Logger = new Logger();
      logger.error(message, error, meta);

      expect(datLoggerErrorStub.calledOnce).to.be.true;
      expect(datLoggerErrorStub.firstCall.args).to.be.eql([message, { ...errorProps, ...meta }]);
    });
  });
});
