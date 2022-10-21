import likesRepository from '../repositories/likes.repository.js';

export async function fetchLikes(req, res) {
  const postId = req.params.postId;
  const userId = req?.query.userId;

  try {
    const likes = await likesRepository.fetchLikes(postId, userId);

    res.status(200).send(likes.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Couldn't fetch likes! ");
  }
}

export async function fetchWhoLiked(req, res) {
  const { postId } = req.params;
  const { userId } = req.params;

  try {
    const whoLiked = await likesRepository.fetchWhoElseLiked(postId, userId);

    res.status(200).send(whoLiked.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Couldn't fetch who liked! ");
  }
}

export async function likePost(req, res) {
  const { postId } = req.params;
  const { userId } = req.params;

  try {
    await likesRepository.likePost(postId, userId);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Couldn't like post!");
  }
}

export async function unlikePost(req, res) {
  const { postId } = req.params;
  const { userId } = req.params;

  try {
    await likesRepository.unlikePost(postId, userId);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Couldn't remove like from post!");
  }
}
