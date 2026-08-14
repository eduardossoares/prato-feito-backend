import type { FastifyReply, FastifyRequest } from "fastify";
import StatusService from "./status.service";

export class StatusController {
  private statusService = new StatusService();

  public async getStatus(_req: FastifyRequest, res: FastifyReply) {
    const data = await this.statusService.getStatus();
    return res.send(data);
  }
}
