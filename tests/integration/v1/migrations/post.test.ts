import { beforeAll, describe, expect, test } from "bun:test";
import { buildApp } from "../../../../src/app";
import { clearDatabase } from "../../../utils/clear-database";

beforeAll(clearDatabase);

describe("POST /api/v1/migrations", () => {
  test("should execute live run of migrations", async () => {
    const testApp = buildApp();

    const executedMigrationsResponse = await testApp.inject({
      method: "POST",
      path: "/api/v1/migrations",
    });

    const pendingMigrationsResponse = await testApp.inject({
      method: "GET",
      path: "/api/v1/migrations",
    });

    const parsedExecutedMigrationsBody = JSON.parse(
      executedMigrationsResponse.body,
    );

    const parsedpendingMigrationsBody = JSON.parse(
      pendingMigrationsResponse.body,
    );

    expect(executedMigrationsResponse.statusCode).toBe(200);
    expect(parsedExecutedMigrationsBody.migrations).toBeArray();
    expect(pendingMigrationsResponse.statusCode).toBe(200);
    expect(parsedpendingMigrationsBody.migrations).toBeArray();
    expect(parsedpendingMigrationsBody.migrations.length).toBe(0);

    await testApp.close();
  });
});
