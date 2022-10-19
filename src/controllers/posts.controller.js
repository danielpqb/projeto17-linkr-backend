import * as userRepositories from "../repositories/users.repository.js";
import * as postsRepositories from "../repositories/posts.repository.js";

export async function createPost(req, res) {
  const { userId, link, text } = req.body;

  try {
    const checkUser = await userRepositories.getUserById(userId);

    if (checkUser.rowCount === 0) {
      res.status(400).send({ message: "User doesn't exist." });
      return;
    }

    if (text) {
      await postsRepositories.createPost({ userId, link, text });
      res.status(201).send({ message: "Post created." });
      return;
    }

    await postsRepositories.createPost({ userId, link });
    res.status(201).send({ message: "Post created." });
    return;
  } catch (error) {
    res.status(500).send({ error: error.message });
    return;
  }
}
