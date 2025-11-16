import { Pool } from "pg";

export const pool = new Pool({
  user: "your_username",
  host: "localhost",
  database: "locking_demo",
  password: "your_password",
  port: 5432,
});
