import type { CreateUserRequestData } from "../../../modules/users/dtos/create-user-dto/create-user-request.dto";

export interface UsersRepositoryInterface {
  createUser(data: CreateUserRequestData): Promise<{
    id: string;
    email: string;
    username: string;
    createdAt: string;
  }>;

  findByEmail(
    email: string,
  ): Promise<{ id: string; email: string; username: string }>;

  findByUsername(username: string): Promise<boolean>;
}
