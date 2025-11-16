import { pool } from "./db";

async function performPessimisticUpdate(name: string, amount: number) {
  const client = await pool.connect();

  try {
    console.log(`${name}: Starting transaction`);

    await client.query("BEGIN");

    console.log(`${name}: Selecting row with FOR UPDATE`);
    const result = await client.query(
      `SELECT * FROM accounts WHERE id = 1 FOR UPDATE;`
    );

    const currentBalance = result.rows[0].balance;
    console.log(`${name}: Current balance = ${currentBalance}`);

    await new Promise((res) => setTimeout(res, 3000)); // simulate work

    const newBalance = currentBalance + amount;
    await client.query(
      `UPDATE accounts SET balance = $1 WHERE id = 1;`,
      [newBalance]
    );

    console.log(`${name}: Updated balance to ${newBalance}`);

    await client.query("COMMIT");
    console.log(`${name}: Commit complete`);
  } catch (err) {
    console.error(`${name}: Error`, err);
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
}

async function run() {
  console.log(`Running pessimistic locking example...\n`);

  performPessimisticUpdate("Tx A", 10);
  setTimeout(() => performPessimisticUpdate("Tx B", 20), 500);

  // Keep process alive
}

run();
