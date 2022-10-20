import * as userRepositories from "../repositories/users.repository.js";
import * as postsRepositories from "../repositories/posts.repository.js";
import * as hashtagsRepositories from "../repositories/hashtags.repository.js";

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

export async function getPosts(req, res) {
  try {
    const posts = await postsRepositories.getAllPosts();

    res.status(200).send(posts.rows);
    return;
  } catch (error) {
    res.status(500).send({ error: error.message });
    return;
  }
}

export async function createPostsHashtags(req, res) {
  const { postId, hashtagId } = req.body;

  try {
    const checkpost = await postsRepositories.getPostById(postId);

    if (checkpost.rowCount === 0) {
      res.status(400).send({ message: "Post doesn't exist." });
      return;
    }

    const checkHashtag = await hashtagsRepositories.getHashtagById(hashtagId);

    if (checkHashtag.rowCount === 0) {
      res.status(400).send({ message: "Hashtag doesn't exist." });
      return;
    }

    await postsRepositories.createPostsHashtags({ postId, hashtagId });
    res.sendStatus(201);
    return;
  } catch (error) {
    res.status(500).send({ error: error.message });
    return;
  }
}
