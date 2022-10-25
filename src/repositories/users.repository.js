import db from "../database/database.js";

async function getUserByEmail(email) {
  return db.query("SELECT * FROM users WHERE email=$1;", [email]);
}

async function getUserById(id) {
  return db.query(`SELECT id,name,"imageUrl" FROM users WHERE id = $1;`, [id]);
}

async function createUser(name, email, password, imageUrl) {
  db.query(`INSERT INTO users (name, email, password, "imageUrl") VALUES ($1, $2, $3, $4);`, [
    name,
    email,
    password,
    imageUrl,
  ]);
}

async function createSession(userId, token) {
  db.query(`INSERT INTO sessions("userId", token) VALUES ($1, $2);`, [userId, token]);
}

async function getUsersWithFilter(filter) {
  return db.query(`SELECT id, name, "imageUrl" FROM users WHERE name ILIKE $1;`, [filter + "%"]);
}

export { getUserByEmail, createUser, createSession, getUserById, getUsersWithFilter };
