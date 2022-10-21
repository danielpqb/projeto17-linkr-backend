import * as userRepositories from "../repositories/users.repository.js";
import * as hashtagsRepositories from "../repositories/hashtags.repository.js";

export async function createHashtag(req, res) {
  const { user } = res.locals;
  const { title } = req.body;
  console.log(title)
  try {
    /*const checkUser = await userRepositories.getUserById(user.id);

    if (checkUser.rowCount === 0) {
      res.status(400).send({ message: "User doesn't exist!" });
      return;
    }*/

    const checkHashtag = await hashtagsRepositories.getHashtagByTitle(title);

    if (checkHashtag.rowCount > 0) {
      res
        .status(409)
        .send({
          message: "Hashtag already exists!",
          hashtagId: checkHashtag.rows[0].id,
        });
      return;
    }

    const hashtagId = await hashtagsRepositories.createHashtag(title);

    res.status(201).send({ message: "Hashtag created.", id: hashtagId });
    return;
  } catch (error) {
    res.status(500).send({ error: error.message });
    return;
  }
}

export async function getHashtags(req, res) {
  try {
    const hashtags = await hashtagsRepositories.getAllHashtags();

    res.status(200).send(hashtags.rows);
    return;
  } catch (error) {
    res.status(500).send({ error: error.message });
    return;
  }
}
