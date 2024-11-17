import { body, validationResult } from 'express-validator';

const validateCarListing = [
    body('price').isNumeric().withMessage('Price must be a number'),
    body('description').notEmpty().withMessage('Description is required'),
    body('make').notEmpty().withMessage('Make is required'),
    body('model').notEmpty().withMessage('Model is required'),
    body('variant').notEmpty().withMessage('Variant is required'),
    body('seller_id').notEmpty().withMessage('Seller ID is required'), 

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }
        next();
    }   
];

export { validateCarListing };
