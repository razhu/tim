import { IConnection, IConnectionPool, MysqlQueryParams } from '@dat/node-mysql';
import { log } from '../../logger';
import { ConnectionPoolFactory } from './connectionPoolFactory';
import { IConnectionEnvelope } from './mysql.interfaces';

/********************************************************************
To instantiate a connectionEnvelope:
const envelope = await ConnectionEnvelope.getNewEnvelope(...);

To execute a query:
envelope.query(...);

When you're done with the connection:
envelope.release();

********************************************************************/

export class ConnectionEnvelope implements IConnectionEnvelope {
  protected _connection: IConnection | void;
  protected _parentEnvelope: IConnectionEnvelope;
  private readonly _connectionPool: IConnectionPool;

  constructor(connectionPool?: IConnectionPool) {
    this._connectionPool = connectionPool || ConnectionPoolFactory.Instance().defaultPool;
  }

  static async getNewEnvelope(
    connectionPool?: IConnectionPool,
    incomingEnvelope?: IConnectionEnvelope
  ): Promise<IConnectionEnvelope> {
    const newEnvelope = new ConnectionEnvelope(connectionPool);
    await newEnvelope.set(incomingEnvelope);
    return newEnvelope;
  }

  async set(incomingEnvelope?: IConnectionEnvelope): Promise<any> {
    this._parentEnvelope = incomingEnvelope;
    this._connection = incomingEnvelope
      ? incomingEnvelope.connection()
      : await this._connectionPool.createConnection().catch((e: any) => {
          log.error('Failed to get connection to data store', e, {});
          throw e;
        });
  }

  // This function only exists for use in set(). You should be able to call envelope.query() instead
  connection(): IConnection | void {
    return this._connection;
  }

  query<T>(command: string, params?: MysqlQueryParams): Promise<T> {
    if (!this._connection) {
      log.error('No connection initialized', null, {});
      throw new Error('No connection initialized');
    }
    return this._connection.query(command, params);
  }

  release() {
    if (this._connection && !this._parentEnvelope) {
      this._connection.release();
      this._connection = null;
    }
  }
}
