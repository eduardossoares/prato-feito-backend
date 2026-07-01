import { describe, expect, test } from "bun:test";
import { pgDatabase } from "infra/db";
import type { QueryResult } from "pg";
import { buildApp } from "src/app";

describe("GET /api/v1/status", () => {
  test("should return server status", async () => {
    const testApp = buildApp();
    const testPgDatabase = new pgDatabase();

    const response = await testApp.inject({
      method: "GET",
      url: "/api/v1/status",
    });

    const rawResult = await testPgDatabase.query(`
      SHOW server_version;
      SHOW max_connections;
      SELECT count(*) AS open_connections FROM pg_stat_activity WHERE application_name = 'prato-feito-backend';
    `);

    const results = rawResult as unknown as QueryResult[];

    const parsedBody = JSON.parse(response.body);
    const parsedUpdatedAt = new Date(parsedBody.updated_at).toISOString();

    expect(response.statusCode).toBe(200);

    expect(parsedBody).toEqual({
      updated_at: parsedUpdatedAt,
      dependencies: {
        database: {
          version: results[0]?.rows[0].server_version,
          max_connections: results[1]?.rows[0].max_connections,
          open_connections: results[2]?.rows[0].open_connections,
        },
      },
    });

    await testApp.close();
  });
});
