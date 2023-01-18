import { ConnectionPool, ConnectionPoolOptions, IConnectionPool } from '@dat/node-mysql';

import { DatLogger } from '@dat/logger';
import { MYSQL_CONFIGS } from '../../config/mysql.config';

export class ConnectionPoolFactory {
  private static instance: ConnectionPoolFactory;
  defaultPool: IConnectionPool;
  multiStatementPool: IConnectionPool;

  private constructor() {
    this.defaultPool = this.createPool(Number(MYSQL_CONFIGS.defaultConnectionsLimit), false);
    this.multiStatementPool = this.createPool(Number(MYSQL_CONFIGS.multiStatementConnectionsLimit), true);
  }

  public static Instance(): ConnectionPoolFactory {
    // NOSONAR
    if (!ConnectionPoolFactory.instance) {
      ConnectionPoolFactory.instance = new ConnectionPoolFactory();
    }
    return ConnectionPoolFactory.instance;
  }

  private createPool(connectionLimit: number, multipleStatements: boolean): IConnectionPool {
    const options: ConnectionPoolOptions = {
      host: MYSQL_CONFIGS.host,
      port: MYSQL_CONFIGS.port,
      user: MYSQL_CONFIGS.username,
      password: MYSQL_CONFIGS.password,
      database: MYSQL_CONFIGS.database,
      connectionLimit,
      multipleStatements,
    };

    if (!MYSQL_CONFIGS.password) {
      delete options.password;
    }
    DatLogger.verbose('Using ConnectionPoolOptions', Object.assign({}, options));

    return new ConnectionPool(options);
  }

  // For a never-ending service, it should never be necessary to shut down the connection pools. However,
  // when running integration tests, when they are complete, we want to gracefully shutdown the test server.
  // If a connection pool is still active, this can't happen.
  public async shutdownPool(): Promise<void> {
    return Promise.all([this.defaultPool.end(), this.multiStatementPool.end()]).then(() => {
      this.defaultPool = null;
      this.multiStatementPool = null;
    });
  }

  public serverConnection(): IConnectionPool {
    const options: any = {
      host: MYSQL_CONFIGS.host,
      port: MYSQL_CONFIGS.port,
      user: MYSQL_CONFIGS.username,
      password: MYSQL_CONFIGS.password,
      multipleStatements: true,
    };

    if (!MYSQL_CONFIGS.password) {
      delete options.password;
    }

    return new ConnectionPool(options);
  }
}
