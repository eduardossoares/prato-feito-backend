import { Client, type QueryConfig } from "pg";

export class pgDatabase {
  client = new Client({
    application_name: "prato-feito-backend",
    connectionString: process.env.DATABASE_URL,
  });

  async query(queryObject: QueryConfig | string) {
    try {
      await this.client.connect();
      const result = await this.client.query(queryObject);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await this.client.end();
    }
  }
}
