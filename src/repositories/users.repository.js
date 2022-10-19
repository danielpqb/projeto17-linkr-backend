import db from "../database/database.js";

async function getUserByEmail(email) {
  return db.query("SELECT * FROM users WHERE email=$1;", [email]);
}

async function createUser(name, email, password, imageUrl) {
  db.query(
    `INSERT INTO users (name, email, password, "imageUrl") VALUES ($1, $2, $3, $4);`,
    [name, email, password, imageUrl]
  );
}

async function createSession(userId, token) {
  db.query(`INSERT INTO sessions("userId", token) VALUES ($1, $2);`, [
    userId,
    token,
  ]);
}

export { getUserByEmail, createUser, createSession };
