import { pgDatabase } from "../../infra/db";

export async function clearDatabase() {
  const database = new pgDatabase();
  await database.query("drop schema public cascade; create schema public;");
}
