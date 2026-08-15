import type { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserRequestDTO } from "./dtos/create-user-dto/create-user-request.dto";
import { CreateUserResponseDTO } from "./dtos/create-user-dto/create-user-response.dto";
import UsersService from "./users.service";

export default class UsersController {
  async createUser(req: FastifyRequest, res: FastifyReply) {
    const service = new UsersService();

    const requestData = new CreateUserRequestDTO(req.body).getData();
    const resultData = await service.createUser(requestData);
    const responseData = new CreateUserResponseDTO(resultData).getData();

    return res.status(201).send(responseData);
  }
}
