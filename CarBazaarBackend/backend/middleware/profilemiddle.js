// profileMiddle.js
import { db } from '../DB/connect.js';

export const validateProfileAccess = async (req, res, next) => {
    const userId = req.params.userId;

    // Check if userId is provided
    if (!userId) {
        return res.status(400).json({ message: "User ID is required", error: true });
    }

    try {
        // Verify if the user exists and is logged in
        const user = await db.query('SELECT * FROM USERS WHERE id = $1', [userId]);

        if (user.rows.length === 0 || user.rows[0].is_login !== 'Y') {
            return res.status(401).json({ message: "Unauthorized access", error: true });
        }

        // Attach user data to the request for further validation in the route
        req.user = user.rows[0];

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: true });
    }
};
