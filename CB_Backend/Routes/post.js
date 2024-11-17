const express = require('express');
const PostRouter = express.Router();
const postController = require('../Controllers/postController');

PostRouter.post('/post', postController.createPost);
PostRouter.get('/post', postController.getAllPosts);
PostRouter.get('/post/:post_id', postController.getPostsById);
PostRouter.put('/post/:post_id', postController.updatePosts);
PostRouter.delete('/post/:post_id', postController.deletePosts);

module.exports = PostRouter;
