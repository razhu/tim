import { Logger } from '../../logger';
import { DatInsuranceSchema, Message, OPERATIONS } from '../kafka.definition';
import { TimResolver } from './tim.resolver';

export class TimProcessor {
  private readonly operationType: OPERATIONS;
  private readonly dotNumber: number;
  private readonly processor: string;
  private readonly timDatInsurance: DatInsuranceSchema;

  constructor(private readonly message: Message<DatInsuranceSchema>, private readonly logger: Logger) {
    this.processor = this.constructor.name;
    this.timDatInsurance = this.message?.state;
    this.operationType = this.message?.operationType;
    this.dotNumber = this.timDatInsurance?.dotNumber;
  }

  async exec(): Promise<void> {
    this.logger.debug('processing', {
      processor: this.processor,
      dotNumber: this.dotNumber,
      operationType: this.operationType,
      messageRaw: this.message,
    });

    const timResolver = new TimResolver(this.message, this.logger);
    await timResolver.process();
  }
}
