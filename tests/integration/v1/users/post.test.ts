import { beforeAll, describe, expect, test } from "bun:test";
import { buildApp } from "../../../../src/app";
import { resetDatabase } from "../../../utils/reset-database";

beforeAll(resetDatabase);

describe("POST /api/v1/users", () => {
  test("should create user", async () => {
    const testApp = await buildApp();

    const response = await testApp.inject({
      method: "POST",
      url: "/api/v1/users",
      body: {
        username: "eduardossoares",
        email: "eduardo21.net@gmail.com",
        password: "21032003",
      },
    });

    expect(response.statusCode).toBe(201);
  });
});
