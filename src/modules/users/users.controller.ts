import type { FastifyReply, FastifyRequest } from "fastify";
import UsersService, { type createUser } from "./users.service";

export default class UsersController {
  async createUser(req: FastifyRequest, res: FastifyReply) {
    const service = new UsersService();
    await service.createUser(req.body as createUser);
    return res.status(201).send();
  }
}
