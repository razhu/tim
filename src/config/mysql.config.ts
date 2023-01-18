export const MYSQL_CONFIGS = {
  database: process.env.MYSQL_DB || 'company_system',
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT || 3306),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD || null,
  ssl: process.env.MYSQL_SSL || null,
  defaultConnectionsLimit: Number(process.env.MYSQL_DEFAULT_CONNS_LIMIT || 100),
  multiStatementConnectionsLimit: Number(process.env.MYSQL_MULTI_STATEMENT_CONNS_LIMIT || 1),
  cacheTtlInSeconds: Number(process.env.CACHE_TTL_IN_SECONDS) || 3600,
};
