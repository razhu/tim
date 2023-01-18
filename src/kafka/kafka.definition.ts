import { TOPICS } from '../config/topic.config';

export interface Exception<T> {
  model: string;
  state: T;
  messages: {
    [i in keyof T | string]: string[];
  };
}

export enum OPERATIONS {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum DocketPrefix {
  MC = 'MC',
  MX = 'MX',
  FF = 'FF',
}

export interface Message<T> {
  model: TOPICS;
  state: T;
  previousState?: T;
  operationType: OPERATIONS;
}

export interface DatInsuranceSchema {
  companyId?: number;
  carrierId: string;
  docketPrefix?: DocketPrefix;
  docketNumber?: string | number;
  dotNumber?: number;
  intrastateState?: string;
  intrastateCode?: string;
  companyName?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  phone?: string;
  fax?: string;
  certificates: DatCertificateSchema[];
}

export interface DatCertificateSchema {
  id: string;
  carrierId: string;
  participationCode?: string;
  created: string;
  insuredName?: string;
  insuredAddress?: string;
  insuredCity?: string;
  insuredStateCode?: string;
  insuredPostalCode?: string;
  insuredPhone?: string;
  insuredFax?: string;
  coverages?: DatCoverageSchema[];
}

export interface DatCoverageSchema {
  id: string;
  certificateId: string;
  coverageType?: string;
  producerPhone?: string;
  producerFax?: string;
  effectiveDate: string | Date;
  expirationDate: string | Date;
  cancelDate?: string | Date;
  policyNumber?: string;
  producer?: string;
  underwriter?: string;
  RmisCertId: number;
  RmisCovgId: number;
  confidence?: string;
  coverageDetail?: string;
  isScheduledAuto: boolean;
  doNotFaxProducer: boolean;
  limits?: DatLimitSchema[];
}

export interface DatLimitSchema {
  id: string;
  coverageId: string;
  isCargo: boolean;
  limitAmount: number;
  limitDescription?: string;
  currencyCode?: string;
}
