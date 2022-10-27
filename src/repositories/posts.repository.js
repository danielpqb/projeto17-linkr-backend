import db from "../database/database.js";

export async function createPost({ userId, urlId, text }) {
  const id = (
    await db.query(
      `INSERT INTO posts
      ("userId", "urlId", text)
      VALUES ($1, $2, $3)
      RETURNING id;`,
      [userId, urlId, text]
    )
  ).rows[0].id;
  return id;
}

export async function getPostById(id) {
  return db.query(`SELECT * FROM posts WHERE id = $1;`, [id]);
}

export async function getAllPosts() {
  return db.query(`SELECT * FROM posts`);
}

export async function getTimelinePosts() {
  return db.query(`SELECT * FROM posts ORDER BY id DESC;`) ;
}

export async function getHashtagFeedPosts(hashtag) {
  return db.query(
    `
  SELECT posts.id,posts."userId",posts."urlId",posts.text FROM "postsHashtags"
  JOIN posts ON posts.id = "postsHashtags"."postId"
  JOIN hashtags ON hashtags.id = "postsHashtags"."hashtagId"
  WHERE hashtags.title = ($1)
  ORDER BY posts.id DESC LIMIT 20;`,
    [hashtag]
  );
}

export async function createPostsHashtags({ postId, hashtagId }) {
  db.query(`INSERT INTO "postsHashtags"("postId", "hashtagId") VALUES ($1, $2);`, [postId, hashtagId]);
}

export async function updatePostText(postId, text) {
  db.query(
    `UPDATE posts 
      SET text=$1
      WHERE id=$2;`,
    [text, postId]
  );
}

export async function deletePostsHashtagsId(postId) {
  db.query(`DELETE FROM "postsHashtags" WHERE "postId" = $1;`, [postId]);
}

export async function deletePost(postId) {
  return db.query(`DELETE FROM posts WHERE id = $1`, [postId]);
}

export async function getPostsByUserId(userId) {
  return db.query(`SELECT * FROM posts WHERE "userId" = $1`, [userId]);
}
