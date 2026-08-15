import type { FastifyReply, FastifyRequest } from "fastify";
import StatusService from "./status.service";
import { GetStatusResponseDTO } from "./dtos/get-status-response.dto";

export class StatusController {
  private statusService = new StatusService();

  public async getStatus(_req: FastifyRequest, res: FastifyReply) {
    const resultData = await this.statusService.getStatus();
    const responseData = new GetStatusResponseDTO(resultData).getData();

    return res.send(responseData);
  }
}
