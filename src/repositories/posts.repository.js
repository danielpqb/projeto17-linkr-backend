import db from "../database/database.js";

export async function createPost({ userId, link, text }) {
  return db.query(
    `INSERT INTO posts("userId", link, text) VALUES ($1, $2, $3)`,
    [userId, link, text]
  );
}
