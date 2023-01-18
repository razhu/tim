import moment from 'moment';
import { createSchema, morphism } from 'morphism';
import {
  DatCertificateEntity,
  DatCoverageEntity,
  DatInsuranceEntity,
  DatLimitEntity,
} from '../../documentDB/entities.definitions';
import { DatCertificateSchema, DatCoverageSchema, DatInsuranceSchema, DatLimitSchema } from '../kafka.definition';

export const timMapper = (data: DatInsuranceSchema): DatInsuranceEntity => {
  const insuranceSchema = createSchema<Partial<DatInsuranceEntity>, DatInsuranceSchema>({
    businessUnitId: 'carrierId',
    companyId: 'companyId', // TODO: Validate if we need to store the company object
    certificates: ({ certificates }) => {
      return certificates.map((certificate) => {
        return certificateMapper(certificate);
      }) as DatCertificateEntity[];
    },
  });
  return morphism(insuranceSchema, data) as DatInsuranceEntity;
};

const certificateMapper = (certificates: DatCertificateSchema): any => {
  const schema = createSchema<Partial<DatCertificateEntity>, DatCertificateSchema>({
    id: 'id',
    participationCode: ({ participationCode }) => participationCode || null,
    created: 'created',
    insuredName: ({ insuredName }) => insuredName || null,
    insuredAddress: ({ insuredAddress }) => insuredAddress || null,
    insuredCity: ({ insuredCity }) => insuredCity || null,
    insuredStateCode: ({ insuredStateCode }) => insuredStateCode || null,
    insuredPostalCode: ({ insuredPostalCode }) => insuredPostalCode || null,
    insuredPhone: ({ insuredPhone }) => insuredPhone || null,
    insuredFax: ({ insuredFax }) => insuredFax || null,
    coverages: ({ coverages }) => {
      return coverages.map((coverage) => {
        return coverageMapper(coverage);
      }) as DatCoverageEntity[];
    },
  });
  return morphism(schema, certificates);
};

const coverageMapper = (coverages: DatCoverageSchema): any => {
  const MOMENT_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
  const schema = createSchema<Partial<DatCoverageEntity>, DatCoverageSchema>({
    id: 'id',
    coverageType: ({ coverageType }) => coverageType || null,
    producerPhone: ({ producerPhone }) => producerPhone || null,
    producerFax: ({ producerFax }) => producerFax || null,
    effectiveDate: ({ effectiveDate }) => moment(effectiveDate, MOMENT_DATE_FORMAT).toDate(),
    expirationDate: ({ expirationDate }) => moment(expirationDate, MOMENT_DATE_FORMAT).toDate(),
    cancelDate: ({ cancelDate }) => moment(cancelDate, MOMENT_DATE_FORMAT).toDate() || null,
    policyNumber: ({ policyNumber }) => policyNumber || null,
    producer: ({ producer }) => producer || null,
    underwriter: ({ underwriter }) => underwriter || null,
    rmisCertId: 'RmisCertId',
    rmisCovgId: 'RmisCovgId',
    confidence: ({ confidence }) => confidence || null,
    coverageDetail: ({ coverageDetail }) => coverageDetail || null,
    isScheduledAuto: 'isScheduledAuto',
    doNotFaxProducer: 'doNotFaxProducer',
    limits: ({ limits }) => {
      return limits.map((limit: DatLimitSchema) => {
        return limitsMapper(limit);
      }) as DatLimitEntity[];
    },
  });
  return morphism(schema, coverages);
};

const limitsMapper = (limits: DatLimitSchema): any => {
  const schema = createSchema<Partial<DatLimitEntity>, DatLimitSchema>({
    id: 'id',
    isCargo: 'isCargo',
    limitAmount: 'limitAmount',
    limitDescription: 'limitDescription',
    currencyCode: 'currencyCode',
  });
  return morphism(schema, limits);
};
