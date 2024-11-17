import express from 'express';
import saveImage from './saveImage.js'; // ES module import
import { validateCarListing } from '../middleware/postmiddle.js'; // ES module import

const PostRouter = express.Router();

PostRouter.post('/post', saveImage.array('images', 5), validateCarListing, async (req, res) => {
    const { price, description, make, model, variant, seller_id } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    try {
        console.log('Car Details Submitted:', { price, description, make, model, variant, seller_id, images });
        res.status(200).json({ message: 'Car listed successfully!' });
    } catch (error) {
        console.error('Error listing car:', error);
        res.status(500).json({ message: 'Failed to list the car.' });
    }
});

export default PostRouter; 
