import { Router } from 'express';
import { likePost, unlikePost } from '../controllers/likes.controller.js';

const likesRouter = Router();

likesRouter.get('/likes/:postId');
likesRouter.post('/likes', likePost);
likesRouter.delete('/likes', unlikePost);

export default likesRouter;
