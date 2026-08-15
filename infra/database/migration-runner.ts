import { join } from "node:path";
import { runner } from "node-pg-migrate";

const databaseUrl = process.env.DATABASE_URL || "";

export const defaultMigrationOptions = {
  databaseUrl: databaseUrl,
  dir: join("infra", "migrations"),
  direction: "up",
  migrationsTable: "pgmigrations",
} as const;

export class MigrationRunner {
  async findPendingMigrations() {
    const pendingMigrations = await runner({
      ...defaultMigrationOptions,
      dryRun: true,
    });

    return {
      migrations: pendingMigrations,
    };
  }

  async runPendingMigrations() {
    const executedMigrations = await runner({
      ...defaultMigrationOptions,
      dryRun: false,
    });

    return {
      migrations: executedMigrations,
    };
  }
}
