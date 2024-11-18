const express = require('express');
const PostRouter = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');  // Import fs module to copy files
const postController = require('../Controllers/postController');

// Define Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Save files in the public/uploads directory of your React app
        const reactPublicPath = path.join(__dirname, '../../public/uploads/');
        cb(null, reactPublicPath);
    },
    filename: (req, file, cb) => {
        // Use a unique name for each file to avoid conflicts
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Create Multer middleware for multiple file uploads
const upload = multer({ storage });

// Function to copy images from uploads to public folder for react components to use w/o any issue
function copyImagesToPublic(fileNames) {
    const sourceDir = path.join(__dirname, '..', 'uploads');
    const destDir = path.join(__dirname, '..', 'public');

    fileNames.forEach(fileName => {
        const sourceFilePath = path.join(sourceDir, fileName);
        const destFilePath = path.join(destDir, fileName);

        // Copy file from source to destination
        fs.copyFile(sourceFilePath, destFilePath, (err) => {
            if (err) {
                console.log(`Error copying file ${fileName}:`, err);
            } else {
                console.log(`${fileName} copied to ${destDir}`);
            }
        });
    });
}

// Define routes
PostRouter.post('/post', upload.array('images', 5), (req, res, next) => {
    // Get the list of uploaded file names
    const fileNames = req.files.map(file => file.filename);

    // Copy images to the public directory
    copyImagesToPublic(fileNames);

    // Proceed to the controller's createPost method
    postController.createPost(req, res, next);
});

PostRouter.get('/post', postController.getAllPosts);
PostRouter.get('/post/:post_id', postController.getPostsById);
PostRouter.put('/post/:post_id', postController.updatePosts);
PostRouter.delete('/post/:post_id', postController.deletePosts);

module.exports = PostRouter;
