import type { QueryResult } from "pg";

export interface StatusRepositoryInterface {
  getStatus(): Promise<QueryResult[]>;
}
