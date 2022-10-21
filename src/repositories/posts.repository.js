import db from "../database/database.js";

export async function createPost({ userId, link, text }) {
  const id = (
    await db.query(
      `INSERT INTO posts("userId", link, text) VALUES ($1, $2, $3) RETURNING id;`,
      [userId, link, text]
    )
  ).rows[0].id;
  return id;
}

export async function getPostById(id) {
  return db.query(`SELECT * FROM posts WHERE ID = $1;`, [id]);
}

export async function getAllPosts() {
  return db.query(`SELECT * FROM posts`);
}

export async function getTimelinePosts() {
  return db.query(`SELECT * FROM posts ORDER BY id DESC LIMIT 20;`);
}

export async function createPostsHashtags({ postId, hashtagId }) {
  db.query(
    `INSERT INTO "postsHashtags"("postId", "hashtagId") VALUES ($1, $2);`,
    [postId, hashtagId]
  );
}
