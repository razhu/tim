import { IConnection, MysqlQueryParams } from '@dat/node-mysql';

export interface IMySqlError {
  address?: string;
  code?: string;
  errno?: string;
  fatal?: boolean;
  message?: string;
  port?: number;
  stack?: string;
  syscall?: string;
}

export interface IConnectionEnvelope {
  connection(): IConnection | void;
  query<T>(command: string, params?: MysqlQueryParams): Promise<T>;
  release(): void;
}

export interface MySqlResponse {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
}
