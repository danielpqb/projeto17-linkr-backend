import db from "../database/database.js";

export async function createUrl({ link, title, description, image }) {
    const id = (
      await db.query(
        `INSERT INTO urls
        ( link, title, description, image)
        VALUES ($1, $2, $3, $4)
        RETURNING id;`,
        [link, title, description, image]
      )
    ).rows[0].id;
    return id;
  }

  export async function getUrl(id) {
    return db.query(
      `SELECT title, description, image
      FROM urls WHERE id = $1;`,
      [id]);
  }