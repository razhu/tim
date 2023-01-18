import { DatInsuranceStorage } from '../../documentDB/DatInsurance.storage';
import { Logger } from '../../logger';
import { DatInsuranceSchema, Message, OPERATIONS } from '../kafka.definition';
import { timMapper } from './tim.mapper';
import { timSingleModelMessageSchema } from './tim.validator';
import { DatabaseService } from '../../services/mysql/database.service';

export class TimResolver {
  constructor(
    private readonly message: Message<DatInsuranceSchema>,
    private readonly logger: Logger,
    protected readonly dataStorage: DatInsuranceStorage = new DatInsuranceStorage(),
    private readonly databaseService = new DatabaseService()
  ) {}

  async process(): Promise<void> {
    const { operationType, state } = this.message;
    const { dotNumber, docketNumber, docketPrefix, intrastateState, intrastateCode } = state;

    if (!dotNumber && !(docketNumber && docketPrefix) && !(intrastateCode && intrastateState)) {
      this.logger.error('Unsupported message with null company identifiers', null, { state });
      return;
    }

    const companyId: number | null = await this.databaseService.getCompany(
      dotNumber,
      docketNumber,
      docketPrefix,
      intrastateState,
      intrastateCode
    );

    if (!companyId) {
      this.logger.warn('Company not found with given identifiers, discard');
      return;
    }

    const timSource = timMapper({ ...state, companyId });
    const { error, value } = timSingleModelMessageSchema.validate(timSource) as any;

    if (error) {
      this.logger.error('Invalid DatInsurance entity', null, {
        rawMessage: this.message,
        error: error.map((e: { details: string }) => e.details).join(),
      });
      return;
    }

    if (OPERATIONS.CREATE === operationType) {
      try {
        // TODO: Implement diff validation
        // TODO: Save to documentDB
        await this.dataStorage.insert(value);
      } catch (error) {
        this.logger.error('Error saving DatInsurance', null, { error });
        return;
      }
    } else if (OPERATIONS.UPDATE === operationType) {
      // TODO: Should inactive old certificate and insert new one
      // TODO: What is the criteria to inactivate the old ones (id?, carrierId?, ...?)
      await this.dataStorage.update(value);
    } else {
      this.logger.error('Unsupported Operation Type', null, { operationType });
      return;
    }
  }
}
