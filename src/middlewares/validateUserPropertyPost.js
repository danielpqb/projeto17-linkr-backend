import * as postsRepositories from "../repositories/posts.repository.js";

async function validateUserPropertyPost(req, res, next) {
  const postId = Number(req.params.id);
  const userId = Number(res.locals.user.id);

  try {
    const post = await postsRepositories.getPostById(postId);
    if (post.rows.length === 0) {
      res.status(404).send({ message: "Post não encontrado" });
      return;
    }

    if (post.rows[0].userId !== userId) {
      res.status(401).send({ message: "Usuário não autorizado" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    return;
  }

  res.locals.postId = postId;
  next();
}

export { validateUserPropertyPost };
