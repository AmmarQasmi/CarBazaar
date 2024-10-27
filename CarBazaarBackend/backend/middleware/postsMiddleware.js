import { db } from "../DB/connect.js";

// Middleware to fetch posts for a user
export const fetchUserPosts = async (req, res, next) => {
    try {
        const postsResult = await db.query("SELECT * FROM posts WHERE user_id = $1", [req.user.u_id]); // Ensure 'posts' is correct
        req.userPosts = postsResult.rows; // Attach posts to the request object for further use
        next();
    } catch (error) {
        console.error("Error fetching user posts:", error);
        return res.status(500).json({ message: "Internal Server Error", error: true });
    }
};
