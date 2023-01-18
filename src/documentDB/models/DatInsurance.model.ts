import { Schema, model } from 'mongoose';
import { DatInsuranceDocument } from '../entities.definitions';

const DatLimitSchema = new Schema({
  id: { type: String, required: true },
  coverageId: { type: String, required: true },
  isCargo: { type: Boolean, required: true },
  limitAmount: { type: Number, required: true },
  limitDescription: { type: String, required: true },
  currencyCode: { type: String, required: false },
});

const DatCoverageSchema = new Schema({
  id: { type: String, required: false },
  certificateId: { type: String, required: true },
  coverageType: { type: String, required: false },
  producerPhone: { type: String, required: false },
  producerFax: { type: String, required: false },
  effectiveDate: { type: String, required: true },
  expirationDate: { type: String, required: true },
  cancelDate: { type: String, required: false },
  policyNumber: { type: String, required: false },
  producer: { type: String, required: false },
  underwriter: { type: String, required: false },
  RmisCertId: { type: Number, required: false },
  RmisCovgId: { type: Number, required: false },
  confidence: { type: String, required: false },
  coverageDetail: { type: String, required: false },
  isScheduledAuto: { type: Boolean, required: false },
  doNotFaxProducer: { type: Boolean, required: false },
  limits: [DatLimitSchema],
});

const DatCertificateSchema = new Schema({
  id: { type: String, required: true },
  carrierId: { type: String, required: true },
  participationCode: { type: String, required: false },
  created: { type: String, required: true },
  insuredName: { type: String, required: false },
  insuredAddress: { type: String, required: false },
  insuredCity: { type: String, required: false },
  insuredStateCode: { type: String, required: false },
  insuredPostalCode: { type: String, required: false },
  insuredPhone: { type: String, required: false },
  insuredFax: { type: String, required: false },
  coverages: [DatCoverageSchema],
});

const DatInsuranceSchema = new Schema<DatInsuranceDocument>({
  doc: {
    carrierId: { type: String, required: true },
    docketPrefix: { type: String, required: false },
    docketNumber: { type: String, required: false },
    dotNumber: { type: Number, required: false },
    intrastateState: { type: String, required: false },
    intrastateCode: { type: String, required: false },
    companyName: { type: String, required: false },
    address: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    postalCode: { type: String, required: false },
    phone: { type: String, required: false },
    fax: { type: String, required: false },
    certificates: [DatCertificateSchema],
  },
  dateCreated: { type: Date, required: true },
  dateUpdated: { type: Date, required: true },
  dateTouched: { type: Date, required: true, index: true },
});
DatInsuranceSchema.index({ _id: 1, dateTouched: 1 });

export const DatInsuranceModel = model('dat_insurances', DatInsuranceSchema);
