// import { assert, expect } from 'chai';
// import * as newrelic from 'newrelic';
// import { SinonStub } from 'sinon';
// import { ImportMock } from 'ts-mock-imports';
// import { NewRelicService } from '../../../src/services/newrelic/newrelic.service';

// describe('/src/services/newrelic.service.ts', () => {
//   let recordCustomEventStub: SinonStub = ImportMock.mockFunction(newrelic, 'recordCustomEvent');
//   let startBackgroundTransactionStub: SinonStub = ImportMock.mockFunction(newrelic, 'startBackgroundTransaction');
//   const service = new NewRelicService();

//   beforeEach(() => {
//     recordCustomEventStub = ImportMock.mockFunction(newrelic, 'recordCustomEvent');
//     startBackgroundTransactionStub = ImportMock.mockFunction(newrelic, 'startBackgroundTransaction');
//   });

//   afterEach(() => {
//     recordCustomEventStub.restore();
//     startBackgroundTransactionStub.restore();
//   });

//   describe('# sendProcessingSampleEvent', () => {
//     it('sends EnrichmentTimProcessingSample', () => {
//       service.sendProcessingSampleEvent({ topic: '111', operationType: 'UPDATE', entityId: 100 });

//       expect(recordCustomEventStub.calledOnce);
//       expect(recordCustomEventStub.args[0]).to.be.eql([
//         'EnrichmentTimProcessingSample',
//         { topic: '111', operationType: 'UPDATE', entityId: 100 },
//       ]);
//     });
//   });

//   describe('# sendProcessingErrorEvent', () => {
//     it('sends EnrichmentTimProcessingError', () => {
//       service.sendProcessingErrorEvent({ topic: '111', entityId: 100, operationType: 'UPDATE', error: 'ParseError' });

//       expect(recordCustomEventStub.calledOnce);
//       expect(recordCustomEventStub.args[0]).to.be.eql([
//         'EnrichmentTimProcessingError',
//         { topic: '111', entityId: 100, operationType: 'UPDATE', error: 'ParseError' },
//       ]);
//     });
//   });

//   describe('# startBackgroundTransaction', () => {
//     it('Execute process with startBackgroundTransaction', async () => {
//       const runJobTest = function () {
//         return new Promise<void>((resolve) => {
//           resolve();
//         });
//       };
//       await service.startBackgroundTransaction('TEST', runJobTest);
//       expect(startBackgroundTransactionStub.calledOnce).to.be.false;
//     });

//     it('Execute process with startBackgroundTransaction', async () => {
//       const runJobTest = function () {
//         return new Promise((reject) => {
//           reject('Failed to run process');
//         });
//       };
//       try {
//         await service.startBackgroundTransaction('TEST', runJobTest);
//       } catch (error) {
//         expect(startBackgroundTransactionStub.calledOnce).to.be.true;
//         expect(startBackgroundTransactionStub.calledWith('TEST', runJobTest));
//         assert.equal(error.message, 'Failed to run process');
//         assert.instanceOf(error, Error);
//       }
//     });
//   });
// });
