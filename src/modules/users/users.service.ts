import type { QueryResult } from "pg";
import type { CreateUserType } from "./dtos/create-user-dto/create-user-request.dto";
import { ConflictError } from "../../shared/http/errors";
import { pgDatabase } from "../../../infra/database";
import { normalizeField } from "./users.input";

export default class UsersService {
  pgDatabase = new pgDatabase();

  async createUser(user: CreateUserType) {
    const normalizedEmail = normalizeField(user.email);
    const normalizedUsername = normalizeField(user.username);

    await this.validateUserCredentials(normalizedEmail, normalizedUsername);

    const rawResult = await this.pgDatabase.query({
      text: "INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING email, username, created_at;",
      values: [normalizedEmail, normalizedUsername, user.password],
    });

    const results = rawResult as unknown as QueryResult;

    return {
      user: {
        email: results.rows[0].email,
        username: results.rows[0].username,
        created_at: results.rows[0].created_at,
      },
    };
  }

  async validateUserCredentials(email: string, username: string) {
    const isDuplicatedEmail = await this.findByEmail(email);

    if (isDuplicatedEmail) {
      throw new ConflictError(
        "The email address is already registered in the system",
      );
    }

    const isDuplicatedUsername = await this.findByUsername(username);

    if (isDuplicatedUsername) {
      throw new ConflictError(
        "The username is already registered in the system",
      );
    }
  }

  async findByEmail(email: string) {
    const rawResult = await this.pgDatabase.query({
      text: "SELECT * FROM users WHERE email = $1;",
      values: [email],
    });

    const results = rawResult as unknown as QueryResult;

    return results.rows[0];
  }

  async findByUsername(username: string) {
    const rawResult = await this.pgDatabase.query({
      text: "SELECT * FROM users WHERE username = $1;",
      values: [username],
    });

    const results = rawResult as unknown as QueryResult;

    return results.rows[0];
  }
}
