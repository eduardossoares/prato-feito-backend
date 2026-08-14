import { pgDatabase } from "../../../infra/database";
import { ConflictError } from "../../shared/http/errors";
import UsersRepository from "../../shared/repositories/users.repository";
import type { CreateUserRequestData } from "./dtos/create-user-dto/create-user-request.dto";

export default class UsersService {
  pgDatabase = new pgDatabase();
  usersRepository = new UsersRepository();

  async createUser(data: CreateUserRequestData) {
    await this.validateUserCredentials(data.email, data.username);

    const result = await this.usersRepository.createUser(data);

    return {
      user: {
        id: result.rows[0].id,
        email: result.rows[0].email,
        username: result.rows[0].username,
        created_at: result.rows[0].created_at,
      },
    };
  }

  async validateUserCredentials(email: string, username: string) {
    const [emailResult, usernameResult] = await Promise.all([
      await this.usersRepository.findByEmail(email),
      await this.usersRepository.findByUsername(username),
    ]);

    if (emailResult.rowCount) {
      throw new ConflictError(
        "The email address is already registered in the system",
      );
    }

    if (usernameResult.rowCount) {
      throw new ConflictError(
        "The username is already registered in the system",
      );
    }
  }
}
