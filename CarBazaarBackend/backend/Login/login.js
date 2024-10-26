import { db } from "../DB/connect.js";
import express from "express";
import { validateLogin } from "../middleware/loginmiddle.js"; // Import the middleware

const LoginRouter = express.Router();

LoginRouter.post("/login", validateLogin, async (req, res) => {
    const { password } = req.body;

    try {
        // Ensure req.user is correctly attached by validateLogin
        if (!req.user) {
            return res.status(401).json({ message: "User not found", error: true });
        }

        // Compare the password. Consider hashing passwords in a real application
        if (req.user.password !== password) {
            return res.status(401).json({ message: "Invalid email or password", error: true });
        }

        // Optionally return user data (excluding password)
        const { password: _, ...userData } = req.user; // Exclude the password from the response

        await db.query('UPDATE USERS SET is_login = $1 WHERE email = $2', ['Y', req.user.email]);

        return res.status(200).json({ message: "Login successful", user: userData, error: false });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: true });
    }
});


export default LoginRouter;
