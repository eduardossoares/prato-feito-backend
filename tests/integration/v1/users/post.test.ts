import { beforeAll, describe, expect, test } from "bun:test";
import { buildApp } from "../../../../src/app";
import { resetDatabase } from "../../../utils/reset-database";

beforeAll(resetDatabase);

describe("POST /api/v1/users", () => {
  const username = "johndoe";
  const email = "johndoe@yahoo.co";
  const password = "mystrongpassword!";

  test("should create user", async () => {
    const testApp = buildApp();

    const response = await testApp.inject({
      method: "POST",
      url: "/api/v1/users",
      body: { username, email, password },
    });

    const parsedBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(201);
    expect(parsedBody.user).toBeDefined();
    expect(parsedBody.user.created_at).toBeDefined();
    expect(parsedBody.user.username).toEqual(username);
    expect(parsedBody.user.email).toEqual(email);
    expect(parsedBody.user.password).toBeUndefined();
  });

  test("should prevents user creation with an already used email", async () => {
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
  });

  test("should prevents user creation with an already used username", async () => {
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
    expect(parsedBody.user.created_at).toBeDefined();
    expect(parsedBody.user.username).toEqual("capitalized_username");
    expect(parsedBody.user.email).toEqual("capitalized_email@yahoo.co");
    expect(parsedBody.user.password).toBeUndefined();
  });

  test("should ensure the creation of a new user with different credentials", async () => {
    const testApp = buildApp();

    const response = await testApp.inject({
      method: "POST",
      url: "/api/v1/users",
      body: {
        username: "differentuser",
        email: "differentemail@yahoo.co",
        password,
      },
    });

    const parsedBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(201);
    expect(parsedBody.user).toBeDefined();
    expect(parsedBody.user.created_at).toBeDefined();
    expect(parsedBody.user.username).toEqual("differentuser");
    expect(parsedBody.user.email).toEqual("differentemail@yahoo.co");
    expect(parsedBody.user.password).toBeUndefined();
  });
});
