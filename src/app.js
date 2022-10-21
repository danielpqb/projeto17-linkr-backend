import express from 'express';
import cors from 'cors';

import usersRoute from './routers/users.router.js';
import postsRoute from './routers/posts.router.js';
import hashtagsRoute from './routers/hashtags.router.js';
import likesRouter from './routers/likes.router.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use(usersRoute);
app.use(postsRoute);
app.use(hashtagsRoute);
app.use(likesRouter);

export default app;
