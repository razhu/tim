import { merge, errorToMetadata } from './logger.helper';
import { expect } from 'chai';

describe('/src/logger/logger.helper.ts', () => {
  describe('# merge', () => {
    it('merges two objects', () => {
      const object1 = { prop1: 'prop11', prop2: 'prop12' };
      const object2 = { prop2: 'prop22', prop3: 'prop23' };

      const result = merge(object1, object2);

      expect(result).to.be.eql({ prop1: 'prop11', prop2: 'prop22', prop3: 'prop23' });
    });
  });

  describe('# errorToMetadata', () => {
    it('converts error to metadata object', () => {
      const error: Error = new Error('UnhandledException');

      const result = errorToMetadata(error);

      expect(result).to.have.property('errorMessage', 'UnhandledException');
      expect(result).to.have.property('errorName', 'Error');
      expect(result).to.have.property('stackTrace');
    });

    describe('when error is not specified', () => {
      it('returns empty object', () => {
        const error: Error = null;

        const result = errorToMetadata(error);

        expect(result).to.be.eql({});
      });
    });
  });
});
