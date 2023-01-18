export interface EnrichmentTimProcessingSample {
  topic: string;
  operationType: string;
  entityId: number | string;
}

export interface EnrichmentTimProcessingError {
  topic: string;
  operationType: string;
  entityId: number | string;
  error: string;
}

export enum NEW_RELIC_EVENT_TYPES {
  PROCESSING_SAMPLE = 'EnrichmentTimProcessingSample',
  PROCESSING_ERROR = 'EnrichmentTimProcessingError',
}

export const NEW_RELIC_GROUP = 'EnrichmentTimWorker';
