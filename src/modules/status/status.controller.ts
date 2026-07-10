import type { FastifyReply, FastifyRequest } from "fastify";
import StatusService from "./status.service";

export class StatusController {
  async getStatus(_req: FastifyRequest, res: FastifyReply) {
    const service = new StatusService();
    const data = await service.getStatus();
    return res.send(data);
  }
}
