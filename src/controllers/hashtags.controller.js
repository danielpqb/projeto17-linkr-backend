import * as repositories from "../repositories/hashtags.repository.js";

export async function createHashtag(req, res) {
  const { name, email, password, imageUrl } = req.body;

  try {
    const find_email = await repositories.getUserByEmail(email);
    if (find_email.rowCount > 0) {
      res.status(409).send({ message: "Email already in use." });
      return;
    }

    await repositories.createUser(name, email, passwordHash, imageUrl);
    res.status(201).send({ message: "Post created." });
    return;
  } catch (error) {
    res.status(500).send({ error: error.message });
    return;
  }
}
