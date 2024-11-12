import { db } from "../DB/connect.js";
import express from "express";
import { checkPurchaseId } from "../middleware/purchasemiddle.js";
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

const purchaseRouter = express.Router();

// Create a new purchase
purchaseRouter.post("/purchase", async (req, res) => {
    const { userId, postId, purchasePrice, paymentStatus, paymentType } = req.body;

    // Check if purchasePrice is provided and valid
    if (!purchasePrice) {
        return res.status(400).json({ message: "Purchase price is required", error: true });
    }

    try {
        // Start a transaction
        await db.query('BEGIN');

        // Insert the purchase
        const purchaseResult = await db.query(
            `INSERT INTO Purchase (users_u_id, post_post_id, purchase_price, payment_status, payment_type, purchase_date)
             VALUES ($1, $2, $3, $4, $5, CURRENT_DATE) RETURNING *`,
            [userId, postId, purchasePrice, paymentStatus, paymentType]
        );

        if (purchaseResult.rows.length === 0) {
            await db.query('ROLLBACK');
            return res.status(400).json({ message: "Purchase not created", error: true });
        }

        const purchase = purchaseResult.rows[0];

        // Fetch the user's email based on their user ID
        const userQuery = await db.query("SELECT email FROM USERS WHERE u_id = $1", [userId]);

        if (userQuery.rows.length === 0) {
            await db.query('ROLLBACK');
            return res.status(404).json({ message: "User not found", error: true });
        }

        const userEmail = userQuery.rows[0].email;

        // Update the vehicle status to 'Sold'
        await db.query("UPDATE VEHICLES SET v_status = 'Sold' WHERE v_id = $1", [postId]);

        // Commit the transaction
        await db.query('COMMIT');

        // Respond with purchase details and user email
        return res.status(201).json({ 
            message: "Purchase created", 
            purchase, 
            userEmail, 
            error: false 
        });

    } catch (error) {
        await db.query('ROLLBACK');
        console.error("Database error:", error);
        return res.status(500).json({ message: "Internal server error", error: true });
    }
});

// Get all purchases
purchaseRouter.get("/purchase", async (req, res) => {
    try {
        const purchases = await db.query('SELECT * FROM Purchase');
        if (purchases.rows.length === 0) {
            return res.status(404).json({ message: "No purchases found", error: true });
        }
        return res.status(200).json({ message: "Purchases history found", purchases: purchases.rows, error: false });
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ message: "Internal server error", error: true });
    }
});

// Param middleware to fetch purchase by ID
purchaseRouter.param("id", checkPurchaseId);

// Get purchase details by ID
purchaseRouter.get("/purchase/:id", async (req, res) => {
    const { users_u_id, purchase_price, payment_status, payment_type, post_post_id } = req.Purchase;

    try {
        // Fetch user's email based on users_u_id from the USERS table
        const userQuery = await db.query("SELECT email FROM USERS WHERE u_id = $1", [users_u_id]);

        if (userQuery.rows.length === 0) {
            return res.status(404).json({ message: "User not found", error: true });
        }

        const userEmail = userQuery.rows[0].email;

        // Respond with purchase details and user email
        return res.status(200).json({ 
            message: "Purchase found", 
            purchase: req.Purchase, 
            userEmail 
        });
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ message: "Internal server error", error: true });
    }
});

export default purchaseRouter;