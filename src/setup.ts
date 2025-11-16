import { Pool } from "pg";

const pool = new Pool({
  user: "your_username",
  host: "localhost",
  database: "locking_demo",
  password: "your_password",
  port: 5432,
});

async function setup() {
  try {
    console.log("Connecting to database locking_demo...");

    // Test DB connection
    await pool.query("SELECT 1");

    console.log("Connected. Creating table accounts...");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS accounts (
        id SERIAL PRIMARY KEY,
        balance INT NOT NULL,
        version INT NOT NULL
      );
    `);

    await pool.query("DELETE FROM accounts;");
    await pool.query(
      "INSERT INTO accounts (balance, version) VALUES ($1, $2);",
      [100, 1]
    );

    console.log("Setup complete → Table ready.");
  } catch (err: any) {
    if (err.code === "3D000") {
      console.error(`
❌ ERROR: Database "locking_demo" does not exist.

Please create it first using:

  createdb locking_demo

Then run:

  npm run setup
`);
    } else {
      console.error("Setup error:", err);
    }
  } finally {
    await pool.end();
  }
}

setup();
