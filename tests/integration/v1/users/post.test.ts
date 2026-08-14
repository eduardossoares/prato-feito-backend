import { beforeAll, describe, expect, test } from "bun:test";
import { buildApp } from "../../../../src/app";
import { resetDatabase } from "../../../utils/reset-database";

beforeAll(resetDatabase);

describe("POST /api/v1/users", () => {
  const email = "johndoe@gmail.com";
  const username = "johndoe";
  const password = "MyStrongPassword123!";

  test("should create user", async () => {
    const testApp = buildApp();

    const response = await testApp.inject({
      method: "POST",
      url: "/api/v1/users",
      body: { email, username, password },
    });

    const parsedBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(201);

    expect(parsedBody.user).toBeDefined();
    expect(parsedBody.user.id).toBeDefined();
    expect(parsedBody.user.created_at).toBeDefined();
    expect(parsedBody.user.email).toEqual(email);
    expect(parsedBody.user.username).toEqual(username);
    expect(parsedBody.user.password).toBeUndefined();

    await testApp.close();
  });

  test("should prevents user creation with already used email", async () => {
    const testApp = buildApp();

    const response = await testApp.inject({
      method: "POST",
      url: "/api/v1/users",
      body: { username: "otherusername", email, password },
    });

    const parsedBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(409);
    expect(parsedBody.code).toEqual("CONFLICT");
    expect(parsedBody.message).toEqual(
      "The email address is already registered in the system",
    );

    await testApp.close();
  });

  test("should prevents user creation with already used username", async () => {
    const testApp = buildApp();

    const response = await testApp.inject({
      method: "POST",
      url: "/api/v1/users",
      body: { username, email: "otheremail@yahoo.co", password },
    });

    const parsedBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(409);
    expect(parsedBody.code).toEqual("CONFLICT");
    expect(parsedBody.message).toEqual(
      "The username is already registered in the system",
    );

    await testApp.close();
  });

  test("should prevents that there is no differentiation in capitalization", async () => {
    const testApp = buildApp();

    const response = await testApp.inject({
      method: "POST",
      url: "/api/v1/users",
      body: {
        username: "CAPITALIZED_USERNAME",
        email: "CAPITALIZED_EMAIL@YAHOO.CO",
        password,
      },
    });

    const parsedBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(201);
    expect(parsedBody.user).toBeDefined();
    expect(parsedBody.user.id).toBeDefined();
    expect(parsedBody.user.created_at).toBeDefined();
    expect(parsedBody.user.username).toEqual("capitalized_username");
    expect(parsedBody.user.email).toEqual("capitalized_email@yahoo.co");
    expect(parsedBody.user.password).toBeUndefined();

    await testApp.close();
  });

  test("should prevents user creation with validation errors", async () => {
    const testApp = buildApp();

    const response = await testApp.inject({
      method: "POST",
      url: "/api/v1/users",
      body: {
        username: "small",
        email: "invalid_email",
        password: "invalid_password",
      },
    });

    const parsedBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(422);
    expect(parsedBody.status_code).toBe(422);
    expect(parsedBody.code).toBe("VALIDATION_ERROR");
    expect(parsedBody.message).toBe("Invalid payload");
    expect(parsedBody.issues).toBeArray();
    expect(parsedBody.issues.length).toBeGreaterThan(0);

    await testApp.close();
  });
});
