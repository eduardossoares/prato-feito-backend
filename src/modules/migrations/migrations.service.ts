import { MigrationRunner } from "../../../infra/database/migration-runner";

export class MigrationsService {
  private migrationRunner = new MigrationRunner();

  public async dryRun() {
    return this.migrationRunner.findPendingMigrations();
  }

  public async liveRun() {
    return this.migrationRunner.runPendingMigrations();
  }
}
