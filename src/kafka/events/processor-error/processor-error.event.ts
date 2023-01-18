import { get, isString } from 'lodash';
import { ProcessorSampleEvent } from '../processor-sample/processor-sample.event';

export class ProcessorErrorEvent extends ProcessorSampleEvent {
  public error: string;
  constructor(public topic: string, message: object, err: Error) {
    super(topic, message);
    this.error = get(err, 'messages') || get(err, 'message');
    if (!isString(this.error)) {
      this.error = JSON.stringify(this.error);
    }
  }
}
