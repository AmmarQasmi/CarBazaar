import { db } from "../DB/connect.js";
import express from "express";
import bcrypt from 'bcrypt'; // Import bcrypt
import { validateAdminLogin } from "../middleware/adminloginmiddle.js"; // Import the middleware

const AdminLoginRouter = express.Router();

AdminLoginRouter.post("/adminlogin", validateAdminLogin, async (req, res) => {
    const { password } = req.body;

    try {
        // Ensure req.user is correctly attached by validateAdminLogin
        if (!req.user) {
            return res.status(401).json({ message: "User not found", error: true });
        }

        // Use bcrypt to compare the hashed password
        const isPasswordCorrect = await bcrypt.compare(password, req.user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password", error: true });
        }

        // Optionally return user data (excluding password)
        const { password: _, ...userData } = req.user; // Exclude the password from the response

        // Update the login status in the database
        await db.query('UPDATE users SET is_login = $1 WHERE email = $2', ['Y', req.user.email]);

        return res.status(200).json({ message: "Admin login successful", user: userData, error: false });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: true });
    }
});

export default AdminLoginRouter;
