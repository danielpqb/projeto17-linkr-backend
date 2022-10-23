import connection from "../database/database.js";

const likesRepository = {
  fetchLikes: async (postId, userId = "") => {
    const query =
      userId === ""
        ? `SELECT COUNT(*) AS likes
        FROM likes 
        WHERE "postId" = $1`
        : `SELECT COUNT(*) AS likes
        FROM likes
        WHERE "postId" = $1 AND "userId" = $2`;
    const values = userId === "" ? [postId] : [postId, userId];

    return connection.query(query, values);
  },

  fetchWhoElseLiked: async (postId, userId) => {
    const query = `SELECT u.name
      FROM likes l
      JOIN users u 
        ON u.id = l."userId"
      JOIN posts p 
        ON p.id = l."postId"
      WHERE p.id = $1 AND l."userId" != $2
      LIMIT 2;`;
    const values = [postId, userId];

    return connection.query(query, values);
  },

  likePost: async (postId, userId) => {
    const query = `INSERT INTO likes ("postId", "userId")
      VALUES ($1, $2)
    `;
    const values = [postId, userId];

    return connection.query(query, values);
  },

  unlikePost: async (postId, userId) => {
    const query = `DELETE FROM likes
      WHERE "postId" = $1 AND "userId" = $2
    `;
    const values = [postId, userId];

    return connection.query(query, values);
  },

  deleteLikes: async (postId) => {
    const query = `DELETE FROM likes WHERE "postId" = $1`;
    const values = [postId];

    return connection.query(query, values);
  },
};

export default likesRepository;
