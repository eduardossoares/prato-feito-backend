import { pgDatabase } from "../../../infra/database";
import { ValidationError } from "../../shared/http/errors";

export type createUser = {
  email: string;
  username: string;
  password: string;
};

export default class UsersService {
  pgDatabase = new pgDatabase();

  async createUser(user: createUser) {
    if (!user || !user.email || !user.username || !user.password) {
      throw new ValidationError("Invalid payload on user creation");
    }

    await this.pgDatabase.query({
      text: "INSERT INTO users (email, username, password) VALUES ($1, $2, $3)",
      values: [user.email, user.username, user.password],
    });
  }
}
