import type { QueryResult } from "pg";
import { pgDatabase } from "../../../infra/database";
import type { StatusRepositoryInterface } from "./interfaces/status-repository.interface";

export class statusRepository implements StatusRepositoryInterface {
  private pgDatabase = new pgDatabase();

  public async getStatus() {
    const rawResults = await this.pgDatabase.query({
      text: `
        SHOW server_version;
        SHOW max_connections;
        SELECT count(*) AS opened_connections FROM pg_stat_activity WHERE application_name = 'prato-feito-backend';
      `,
    });

    return rawResults as unknown as QueryResult[];
  }
}
