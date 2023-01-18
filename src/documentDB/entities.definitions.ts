export interface DatInsuranceEntity {
  businessUnitId: string;
  companyId: number;
  certificates: DatCertificateEntity[];
}

export interface DatCertificateEntity {
  id: string;
  participationCode?: string;
  created: string;
  insuredName?: string;
  insuredAddress?: string;
  insuredCity?: string;
  insuredStateCode?: string;
  insuredPostalCode?: string;
  insuredPhone?: string;
  insuredFax?: string;
  coverages?: DatCoverageEntity[];
}

export interface DatCoverageEntity {
  id: string;
  coverageType?: string;
  producerPhone?: string;
  producerFax?: string;
  effectiveDate: string | Date;
  expirationDate: string | Date;
  cancelDate?: string | Date;
  policyNumber?: string;
  producer?: string;
  underwriter?: string;
  rmisCertId: number;
  rmisCovgId: number;
  confidence?: string;
  coverageDetail?: string;
  isScheduledAuto: boolean;
  doNotFaxProducer: boolean;
  limits?: DatLimitEntity[];
}

export interface DatLimitEntity {
  id: string;
  isCargo: boolean;
  limitAmount: number;
  limitDescription?: string;
  currencyCode?: string;
}

export interface DatInsuranceDocument extends Document {
  doc: DatInsuranceEntity;
  dateCreated: Date;
  dateUpdated: Date;
  dateTouched: Date;
}
