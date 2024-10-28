import { db } from "../DB/connect.js";

export const validateAdminLogin = async (req, res, next) => {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required", error: true });
    }

    try {
        // Check if the email exists in the database
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Invalid email or password", error: true });
        }

        // Check if the user has the admin role
        if (user.rows[0].role_id !== 1) { // Assuming role_id 1 is for admins
            return res.status(403).json({ message: "Access denied: Not an admin", error: true });
        }

        // Attach user data to the request for further validation in the route
        req.user = user.rows[0];

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: true });
    }
};
