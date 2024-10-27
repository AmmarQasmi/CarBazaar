import { db } from "../DB/connect.js";
import express from "express";
import { checkUserId } from "../middleware/usersmiddle.js";
import { fetchUserPosts } from "../middleware/postsMiddleware.js"; // Make sure this import is correct

const UserRouter = express.Router();

// Get all users
UserRouter.get("/users", async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users'); // Correct table name

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No users found", error: true });
        }

        return res.status(200).json({ message: "Users found", users: result.rows, error: false });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Internal server error", error: true });
    }
});

// Middleware for checking user ID
UserRouter.param("id", checkUserId);

// Get user by ID along with their posts
UserRouter.get("/users/:id", fetchUserPosts, (req, res) => {
    res.status(200).json({ message: "User found!", user: { ...req.user, posts: req.userPosts } });
});

// Delete user by ID
UserRouter.delete("/users/:id", async (req, res) => {
    try {
        await db.query("DELETE FROM users WHERE u_id = $1", [req.users.u_id]); // Correct table name
        res.status(200).json({ message: "User deleted successfully", error: false });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error", error: true });
    }
});

export default UserRouter;
