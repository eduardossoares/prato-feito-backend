import { statusRepository } from "../../shared/repositories/status.repository";

export default class StatusService {
  private statusRepository = new statusRepository();

  public async getStatus() {
    const results = await this.statusRepository.getStatus();

    return {
      updated_at: new Date().toISOString(),
      dependencies: {
        database: {
          version: results[0]?.rows[0].server_version,
          max_connections: results[1]?.rows[0].max_connections,
          opened_connections: results[2]?.rows[0].opened_connections,
        },
      },
    };
  }
}
