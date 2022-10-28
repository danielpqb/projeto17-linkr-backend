import * as repositories from "../repositories/comments.repository.js";

async function getCommentsDataByPostId_checkIfAUserFollowsWhoCommented(req, res) {
  const { postId, userId } = req.params;

  try {
    const comments = await repositories.getCommentsDataByPostId_checkIfAUserFollowsWhoCommented(postId, userId);
    if (comments.rowCount <= 0) {
      res.status(204).send({ message: "No comments found." });
      return;
    }

    res.status(200).send({ message: "Comments data found.", commentsData: comments.rows });
    return;
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }
}

async function postNewComment(req, res) {
  const { user } = res.locals;
  const { postId, text } = req.body;

  try {
    await repositories.postNewComment(user.id, postId, text);
    res.status(201).send({ message: "Comment created." });
    return;
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }
}

export { getCommentsDataByPostId_checkIfAUserFollowsWhoCommented, postNewComment };
