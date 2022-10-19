import db from "../database/database.js";

export async function createHashtag(title) {
  db.query(`INSERT INTO hashtags (title) VALUES ($1);`, [title]);
}

export async function getHashtagByTitle(title) {
  return db.query(`SELECT * FROM hashtags WHERE title ILIKE $1;`, [title]);
}

export async function getAllHashtags() {
  return db.query(`SELECT * FROM hashtags;`);
}

export async function getHashtagById(id) {
  return db.query(`SELECT * FROM hashtags WHERE id = $1;`, [id]);
}
