import type { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserRequestDTO } from "./dtos/create-user-dto/create-user-request.dto";
import UsersService from "./users.service";

export default class UsersController {
  async createUser(req: FastifyRequest, res: FastifyReply) {
    const service = new UsersService();

    const userData = new CreateUserRequestDTO(req.body).getData();
    const data = await service.createUser(userData);

    return res.status(201).send(data);
  }
}
