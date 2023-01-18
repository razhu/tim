import { get } from 'lodash';

export class ProcessorSampleEvent {
  public entityId: number | string;
  public operationType: string;
  constructor(public topic: string, message: object) {
    this.entityId = get(message, 'state.id') || null;
    this.operationType = get(message, 'operationType') || null;
  }
}
