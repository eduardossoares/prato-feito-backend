import { MigrationRunner } from "../../../infra/database/migration-runner";

export class MigrationsService {
  migrationRunner = new MigrationRunner();

  async dryRun() {
    return this.migrationRunner.findPendingMigrations();
  }

  async liveRun() {
    return this.migrationRunner.runPendingMigrations();
  }
}
