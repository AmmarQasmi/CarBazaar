import { db } from "../DB/connect.js";
export const validateLogin = async (req, res, next) => {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required", error: true });
    }

    try {
        // Check if the email exists in the database
        const user = await db.query('SELECT * FROM USERS WHERE email = $1', [email]);

        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Invalid email or password", error: true });
        }

        // Attach user data to the request for further validation in the route
        req.user = user.rows[0];

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: true });
    }
};
