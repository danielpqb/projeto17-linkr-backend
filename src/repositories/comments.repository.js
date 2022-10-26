import db from "../database/database.js";

async function getUserByEmail(postId) {
  return db.query("SELECT * FROM comments WHERE postId=$1;", [postId]);
}

export { getUserByEmail };
