import pool from "./pool.js";

async function test() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("DB connection OK:", result.rows[0]);
  } catch (err) {
    console.error("DB connection error:", err);
  } finally {
    await pool.end();
  }
}

test();
