import type { FastifyReply, FastifyRequest } from "fastify";
import { MigrationsService } from "./migrations.service";

export class MigrationsController {
  private migrationsService = new MigrationsService();

  public async dryRun(_req: FastifyRequest, res: FastifyReply) {
    const data = await this.migrationsService.dryRun();
    return res.status(200).send(data);
  }

  public async liveRun(_req: FastifyRequest, res: FastifyReply) {
    const service = new MigrationsService();
    const data = await service.liveRun();
    return res.status(200).send(data);
  }
}
