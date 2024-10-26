// profile.js
import express from 'express';
import { db } from '../DB/connect.js';
import { validateProfileAccess } from '../middleware/profileMiddle.js'; // Middleware to validate access

const ProfileRouter = express.Router();

// Get user profile
ProfileRouter.get('/:userId', validateProfileAccess, async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch user profile from the database
        const result = await db.query('SELECT id, name, email FROM USERS WHERE id = $1', [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found", error: true });
        }

        return res.status(200).json({ profile: result.rows[0], error: false });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: true });
    }
});

// Update user profile
ProfileRouter.put('/:userId', validateProfileAccess, async (req, res) => {
    const { userId } = req.params;
    const { name, email } = req.body;

    try {
        // Update user profile in the database
        const result = await db.query(
            'UPDATE USERS SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
            [name, email, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found", error: true });
        }

        return res.status(200).json({ profile: result.rows[0], message: "Profile updated successfully", error: false });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: true });
    }
});

export default ProfileRouter;
