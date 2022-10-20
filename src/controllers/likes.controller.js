import * as likesRepositories from '../repositories/likes.repository.js';

async function getPostLikes(req, res) {}

async function likePost(req, res) {
  const { userId, postId } = req.body;
  console.log(userId, postId);
  console.log(await likesRepositories.userHasLiked(userId, postId));

  if (!(await likesRepositories.userHasLiked(userId, postId))) {
    try {
      await likesRepositories.likePost(userId, postId);
      return res.sendStatus(201);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  } else {
    console.log('nothing happened');
    return res.sendStatus(200);
  }
}

async function unlikePost(req, res) {
  const { userId, postId } = req.body;
  if (await likesRepositories.userHasLiked(userId, postId)) {
    try {
      await likesRepositories.unlikePost(userId, postId);
      return res.sendStatus(201);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  } else {
    console.log('nothing happened');
    return res.sendStatus(200);
  }
}

export { likePost, unlikePost };
