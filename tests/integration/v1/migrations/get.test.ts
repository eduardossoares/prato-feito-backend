import { beforeAll, describe, expect, test } from "bun:test";
import { buildApp } from "../../../../src/app";
import { clearDatabase } from "../../../utils/clear-database";

beforeAll(clearDatabase);

describe("GET /api/v1/migrations", async () => {
  test("should execute and return dry run of migrations", async () => {
    const testApp = buildApp();

    const response = await testApp.inject({
      method: "GET",
      url: "/api/v1/migrations",
    });

    const parsedBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(parsedBody.migrations).toBeArray();
    expect(parsedBody.migrations.length).toBeGreaterThan(0);

    await testApp.close();
  });
});
