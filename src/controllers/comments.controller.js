import * as repositories from "../repositories/comments.repository.js";

async function getCommentsDataByPostId(req, res) {
  const { postId } = req.params;

  try {
    const comments = await repositories.getCommentsDataByPostId(postId);
    if (comments.rowCount <= 0) {
      res.status(404).send({ message: "No comments found." });
      return;
    }

    res.status(200).send({ message: "Comments data found.", commentsData: comments });
    return;
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }
}

async function postComment(req, res) {}

export { getCommentsDataByPostId, postComment };
