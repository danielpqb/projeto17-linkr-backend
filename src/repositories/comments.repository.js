import db from "../database/database.js";

async function getCommentsDataByPostId(postId) {
  return db.query(
    `
    SELECT
    comments.id,
    comments.text,
    comments."userId" AS "userId",
    posts."userId" AS "postUserId",
    comments."postId",
    comments."createdAt",
    users.name AS "userName",
    users."imageUrl" AS "userPhoto"

    FROM comments

    JOIN users ON users.id=comments."userId"
    JOIN posts ON posts.id=comments."postId"
    
    WHERE comments."postId"=$1
    
    ORDER BY comments."createdAt" DESC;
   `,
    [postId]
  );
}

async function getCommentsFromAPostThatAUserFollows(postId, userId) {
  return db.query(
    `
    SELECT
    comments.*

    FROM comments

    JOIN users ON users.id=comments."userId"
    JOIN follows ON comments."userId"=follows."followedId"

    WHERE comments."postId"=$1 AND follows."followerId"=$2

    ORDER BY comments."createdAt" DESC;
   `,
    [postId, userId]
  );
}

async function getCommentsDataByPostId_checkIfAUserFollowsWhoCommented(postId, userId) {
  return db.query(
    `
    SELECT
    comments.id,
    comments.text,
    comments."userId" AS "userId",
    posts."userId" AS "postUserId",
    comments."postId",
    comments."createdAt",
    users.name AS "userName",
    users."imageUrl" AS "userPhoto",

    CASE
      WHEN comments.id IN
      (
      SELECT
      comments.id

      FROM comments

      JOIN users ON users.id=comments."userId"
      JOIN follows ON comments."userId"=follows."followedId"

      WHERE comments."postId"=$1 AND follows."followerId"=$2
      )
      THEN true
      ELSE false
      END following

    FROM comments

    JOIN users ON users.id=comments."userId"
    JOIN posts ON posts.id=comments."postId"

    WHERE comments."postId"=$1

    ORDER BY comments."createdAt" DESC;
   `,
    [postId, userId]
  );
}

async function postNewComment(userId, postId, text) {
  return db.query(
    `
    INSERT INTO
    comments
    ("userId", "postId", text)

    VALUES
    ($1, $2, $3);
   `,
    [userId, postId, text]
  );
}

export {
  getCommentsDataByPostId,
  postNewComment,
  getCommentsFromAPostThatAUserFollows,
  getCommentsDataByPostId_checkIfAUserFollowsWhoCommented,
};
