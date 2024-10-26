import { db } from "../DB/connect.js";
import express from "express";
import { checkSignupId } from "../middleware/signupmiddle.js";

const SignupRouter = express.Router();

SignupRouter.post("/signup", async (req, res) => {
    const { email, name, password, phone_no } = req.body; 
    try {
        const existingUser = await db.query('SELECT * FROM USERS WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: "User already exists", error: true });
        }

        const newUser = await db.query(
            'INSERT INTO USERS (email, name, password, phone_no, role_id, is_login) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [email, name, password, phone_no, 2, 'N'] //regular user
        );

        return res.status(201).json({ message: "Signup Successful", user: newUser.rows[0], error: false });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ message: "Internal server error", error: true });
    }
});

SignupRouter.param("id", checkSignupId);

SignupRouter.get("/signup/:id", async (req, res) => {
    res.status(200).json({ message: "found!", user: req.users });
});

export default SignupRouter;
