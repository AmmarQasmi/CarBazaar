import { db } from "../DB/connect.js";
import express from "express";
import { checkPurchaseId } from "../middleware/purchasemiddle.js";

const purchaseRouter = express.Router();
purchaseRouter.get("/purchase",async (req,res) => {
    try {
        const purchases = await db.query('SELECT * FROM Purchase');
        if(purchases.rows.length === 0) {
            return res.status(404).json({message: "No purchases found",error: true});
        }
        return res.status(200).json({message: "Purchases history found",Purchase: purchases.rows, error: false});
    } catch (error) {
        return res.status(500).json({message: "Internal server error",error: true});
    }
});

purchaseRouter.param("id",checkPurchaseId);

purchaseRouter.get("/purchase/:id", async (req,res) => {
    res.status(200).json({message: "found!", Purchase: req.Purchase});
})

export default purchaseRouter;