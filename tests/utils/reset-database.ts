import { clearDatabase } from "../../infra/database/clear-database";
import { MigrationRunner } from "../../infra/database/migration-runner";

export async function resetDatabase() {
  const migrationRuner = new MigrationRunner();
  await clearDatabase();
  await migrationRuner.runPendingMigrations();
}
