import { stripHtml } from "string-strip-html";
import urlMetadata from "url-metadata";

import * as userRepositories from "../repositories/users.repository.js";
import * as postsRepositories from "../repositories/posts.repository.js";
import * as hashtagsRepositories from "../repositories/hashtags.repository.js";
import * as urlsRepositories from "../repositories/urls.repository.js";
import likesRepository from "../repositories/likes.repository.js";

export async function createPost(req, res) {
  const { userId, link, text } = req.body;

  try {
    const checkUser = await userRepositories.getUserById(userId);

    if (checkUser.rowCount === 0) {
      res.status(400).send({ message: "User doesn't exist." });
      return;
    }

    let title, description, image;

    await urlMetadata(link).then(
      function (metadata) {
        title = metadata.title;
        description = metadata.description;
        image = metadata.image;
      },
      function (error) {
        title = "Erro 400";
        description = "Erro na renderização do link";
        image = "https://ps.w.org/broken-link-checker/assets/icon-256x256.png";
      }
    );

    const urlId = await urlsRepositories.createUrl({link, title, description, image});
    const postId = await postsRepositories.createPost({ userId, urlId, text });
    res.status(201).send({ message: "Post created.", id: postId });
    return;

  } catch (error) {
    res.status(500).send({ error: error.message });
    return;
  }
}

export async function getPosts(req, res) {
  try {
    const posts = await postsRepositories.getTimelinePosts();
    for (let i = 0; i < posts.rows.length; i++) {
      
      const urlData = await urlsRepositories.getUrl(posts.rows[i].urlId);
      posts.rows[i].metadata = urlData.rows[0];
 
      const user = await userRepositories.getUserById(posts.rows[i].userId);
      posts.rows[i].user = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        image: user.rows[0].imageUrl,
      };
    }
    return res.status(200).send([posts.rows]);
  } catch (error) {
    res.status(500).send({ error: error.message });
    return;
  }
}

export async function getAllPosts(req, res) {
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

export async function getHashtagPosts(req, res) {
  try {
    const hashtag = req.params.hashtag;
    const posts = await postsRepositories.getHashtagFeedPosts(hashtag);
    for (let i = 0; i < posts.rows.length; i++) {

      const urlData = await urlsRepositories.getUrl(posts.rows[i].urlId);
      posts.rows[i].metadata = urlData.rows[0];

      const user = await userRepositories.getUserById(posts.rows[i].userId);
      posts.rows[i].user = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        image: user.rows[0].imageUrl,
      };
    }
    return res.status(200).send([posts.rows]);
  } catch (error) {
    res.status(500).send({ error: error.message });
    return;
  }
}

export async function updateUserPost(req, res) {
  let { text } = req.body;
  const postId = res.locals.postId;

  if (text) {
    text = stripHtml(text).result;
  } else {
    text = "";
  }

  try {
    await postsRepositories.updatePostText(postId, text);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function updatePostsHashtags(req, res) {
  const { postId } = res.locals;
  const hashtags = req.body;

  try {
    await postsRepositories.deletePostsHashtagsId(postId);

    hashtags.forEach(async (hashtag) => {
      const title = stripHtml(hashtag).result;
      const checkHashtag = await hashtagsRepositories.getHashtagByTitle(title);
      let hashtagId;
      if (checkHashtag.rows.length === 0) {
        hashtagId = await hashtagsRepositories.createHashtag(title);
      } else {
        hashtagId = checkHashtag.rows[0].id;
      }
      await postsRepositories.createPostsHashtags({ postId, hashtagId });
    });

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deletePost(req, res) {
  const { postId } = req.params;

  try {
    await likesRepository.deleteLikes(postId);
    await postsRepositories.deletePostsHashtagsId(postId);
    await postsRepositories.deletePost(postId);
    return res.status(204).send({ message: "post deleted" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getUserPosts(req, res) {
  const userId = req.params.userId;
  try {
    const posts = await postsRepositories.getPostsByUserId(userId);
    for (let i = 0; i < posts.rows.length; i++) {
      await urlMetadata(posts.rows[i].link).then(
        function (metadata) {
          posts.rows[i].metadata = {
            image: metadata.image,
            title: metadata.title,
            description: metadata.description,
          };
        },
        function (error) {
          posts.rows[i].metadata = {
            image: "https://ps.w.org/broken-link-checker/assets/icon-256x256.png",
            title: "Erro 400",
            description: "Erro na renderização do link",
          };
        }
      );
      const user = await userRepositories.getUserById(posts.rows[i].userId);
      posts.rows[i].user = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        image: user.rows[0].imageUrl,
      };
    }
    return res.status(200).send([posts.rows]);
  } catch (error) {
    res.status(500).send({ error: error.message });
    return;
  }
}

export async function getPostDataById(req, res) {
  const { id } = req.params;
  console.log(id);

  try {
    const post = await postsRepositories.getPostById(id);
    console.log(post);
    if (post.rowCount <= 0) {
      res.status(404).send({ message: "Post could not be found." });
      return;
    }

    res.status(200).send({
      message: `Post data found.`,
      postData: post.rows[0],
    });
    return;
  } catch (error) {
    res.status(500).send({ error: error.message });
    return;
  }
}
