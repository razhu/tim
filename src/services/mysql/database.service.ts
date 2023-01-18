import { IConnectionPool } from '@dat/node-mysql';
import { ConnectionEnvelope } from './connectionEnvelope';
import { ConnectionPoolFactory } from './connectionPoolFactory';
import { log } from '../../logger';

export class DatabaseService {
  protected readonly connectionPool: IConnectionPool;

  constructor() {
    this.connectionPool = ConnectionPoolFactory.Instance().defaultPool;
  }

  async getCompany(
    dotNumber: string | number | null,
    docketNumber: string | number | null,
    docketPrefix: string | null,
    intrastateState: string | null,
    intrastateCode: string | null
  ): Promise<number | null> {
    const envelope = await ConnectionEnvelope.getNewEnvelope(this.connectionPool);
    try {
      const sql =
        'SELECT * FROM company_system.company WHERE dotNumber = :dotNumber ' +
        'AND docketNumber = :docketNumber ' +
        'AND (docketPrefix = :docketPrefix OR docketPrefix IS NULL) ' +
        'AND (intrastateState = :intrastateState OR intrastateState IS NULL) ' +
        'AND (intrastateCode = :intrastateCode OR intrastateCode IS NULL) ';
      const result = await envelope.query(sql, {
        dotNumber,
        docketNumber,
        docketPrefix,
        intrastateState,
        intrastateCode,
      });
      return Array.isArray(result) && result.length > 0 ? result[0].id : null;
    } catch (err) {
      log.error('Failed to get company record', err);
      throw err;
    } finally {
      envelope.release();
    }
  }
}
