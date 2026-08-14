import type { QueryResult } from "pg";
import { pgDatabase } from "../../../infra/database";
import type { CreateUserRequestData } from "../../modules/users/dtos/create-user-dto/create-user-request.dto";
import type { UsersRepositoryInterface } from "./interfaces/users-repository.interface";

export default class UsersRepository implements UsersRepositoryInterface {
  pgDatabase = new pgDatabase();

  async createUser(data: CreateUserRequestData) {
    const rawResult = await this.pgDatabase.query({
      text: `
        INSERT INTO users (email, username, password)
        VALUES ($1, $2, $3)
        RETURNING id, email, username, created_at;
      `,
      values: [data.email, data.username, data.password],
    });

    const result = rawResult as QueryResult;
    return result.rows[0];
  }

  async findByEmail(email: string) {
    const rawResult = await this.pgDatabase.query({
      text: "SELECT (id, email, username) FROM users WHERE email = $1",
      values: [email],
    });

    const result = rawResult as QueryResult;
    return result.rows[0];
  }

  async findByUsername(username: string) {
    const rawResult = await this.pgDatabase.query({
      text: "SELECT (id, email, username) FROM users WHERE username = $1",
      values: [username],
    });

    const result = rawResult as QueryResult;
    return result.rows[0];
  }
}
