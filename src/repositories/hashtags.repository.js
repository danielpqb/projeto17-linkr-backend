import db from "../database/database.js";

export async function createHashtag(title) {
  const id = (
    await db.query(`INSERT INTO hashtags (title) VALUES ($1) RETURNING id;`, [
      title,
    ])
  ).rows[0].id;
  return id;
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

export async function getRankingHashtags() {
  return db.query(`SELECT hashtags.title FROM hashtags JOIN "postsHashtags" ON hashtags.id = "postsHashtags"."hashtagId" GROUP BY hashtags.title ORDER BY COUNT(hashtags.title) DESC LIMIT 10;`);
}