import type { QueryResult } from "pg";
import type { CreateUserRequestData } from "../../../modules/users/dtos/create-user-dto/create-user-request.dto";

export interface UsersRepositoryInterface {
  createUser(data: CreateUserRequestData): Promise<QueryResult>;
  findByEmail(email: string): Promise<QueryResult>;
  findByUsername(username: string): Promise<QueryResult>;
}
