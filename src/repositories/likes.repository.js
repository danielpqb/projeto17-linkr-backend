import connection from '../database/database.js';

async function getLikes(postId) {
  const response = await connection.query(
    `SELECT * FROM likes WHERE "postId" = $1`,
    [postId]
  );

  return response.rows;
}

async function likePost(userId, postId) {
  return connection.query(
    `INSERT INTO likes ("userId", "postId") VALUES ($1, $2)`,
    [userId, postId]
  );
}

async function unlikePost(userId, postId) {
  return connection.query(
    `DELETE FROM likes WHERE "userId" = $1 AND "postId" = $2`,
    [userId, postId]
  );
}

async function userHasLiked(userId, postId) {
  const response = await connection.query(
    `SELECT * FROM likes WHERE "userId" = $1 AND "postId"= $2`,
    [userId, postId]
  );

  return response.rowCount > 0 ? true : false;
}

export { getLikes, likePost, unlikePost, userHasLiked };
