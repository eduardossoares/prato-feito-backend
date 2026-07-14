import { describe, expect, test } from "bun:test";
import { buildApp } from "../../../../src/app";

describe("GET /api/v1/status", () => {
  test("should return server status", async () => {
    const testApp = buildApp();

    const response = await testApp.inject({
      method: "GET",
      url: "/api/v1/status",
    });

    const rawResponseBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(rawResponseBody.updated_at).toBeDefined();
    expect(rawResponseBody.dependencies.database.version).toBe("16.14");
    expect(rawResponseBody.dependencies.database.max_connections).toBe("100");
    expect(rawResponseBody.dependencies.database.opened_connections).toBe("1");

    await testApp.close();
  });
});
