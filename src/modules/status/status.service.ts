import type { QueryResult } from "pg";
import { pgDatabase } from "../../../infra/db";

export default class StatusService {
  pgDatabase = new pgDatabase();

  async getStatus() {
    const rawResult = await this.pgDatabase.query(`
      SHOW server_version;
      SHOW max_connections;
      SELECT count(*) AS open_connections FROM pg_stat_activity WHERE application_name = 'prato-feito-backend';
    `);

    const results = rawResult as unknown as QueryResult[];

    return {
      updated_at: new Date().toISOString(),
      dependencies: {
        database: {
          version: results[0]?.rows[0].server_version,
          max_connections: results[1]?.rows[0].max_connections,
          open_connections: results[2]?.rows[0].open_connections,
        },
      },
    };
  }
}
