const express = require('express');
const multer = require('multer');
const path = require('path');
const postController = require('../Controllers/postController');

// Initialize Router
const PostRouter = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/uploads/')); // Directory for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Unique file naming
    },
});

// Multer middleware for multiple file uploads
const upload = multer({ storage });

// Define routes
PostRouter
    .post('/post', upload.array('images', 5), postController.createPost) // Upload and create post
    .get('/post', postController.getAllPosts) // Get all posts
    .get('/post/:post_id', postController.getPostsById) // Get post by ID
    .put('/post/:post_id', postController.updatePost) // Update post by ID
    .delete('/post/:post_id', postController.deletePosts) // Delete post by ID
    .put('/post/:postId/sold', postController.markPostAsSold);

module.exports = PostRouter;
