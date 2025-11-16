import { pool } from "./db";

async function optimisticUpdate(name: string, amount: number) {
  const client = await pool.connect();

  try {
    const read = await client.query(
      `SELECT balance, version FROM accounts WHERE id = 1;`
    );

    const balance = read.rows[0].balance;
    const version = read.rows[0].version;

    console.log(`${name}: Read balance=${balance}, version=${version}`);

    await new Promise((res) => setTimeout(res, 2000)); // simulate delay

    const newBalance = balance + amount;

    const update = await client.query(
      `UPDATE accounts 
       SET balance = $1, version = version + 1
       WHERE id = 1 AND version = $2`,
      [newBalance, version]
    );

    if (update.rowCount === 0) {
      console.log(`❌ ${name}: Optimistic lock failed (version mismatch)`);
    } else {
      console.log(`✅ ${name}: Updated balance to ${newBalance}`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
}

async function run() {
  console.log("Running optimistic locking example...\n");

  optimisticUpdate("Worker A", 10);
  setTimeout(() => optimisticUpdate("Worker B", 20), 500);
}

run();
