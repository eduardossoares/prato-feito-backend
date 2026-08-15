import { Pool, type QueryConfig } from "pg";

const pool = new Pool({
  application_name: "prato-feito-backend",
  connectionString: process.env.DATABASE_URL,
  max: 10,
});

export class pgDatabase {
  async query(queryObject: QueryConfig | string) {
    try {
      const result = await pool.query(queryObject);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
