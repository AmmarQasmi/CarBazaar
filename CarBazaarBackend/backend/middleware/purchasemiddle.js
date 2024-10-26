import { db } from "../DB/connect.js";

export const checkPurchaseId = async (req,res,next,id) => {
    try {
        const data = await db.query("Select p_id from Purchase where p_id = $1",[id]);
        if(data.rows.length === 0) {
            return res.status(404).json({message: "No purchase history found", error: true, id: null});
        }
        req.Purchase = data.rows[0];
        next();
    } catch (error) {
        res.status(500).json({message: "Internal Server Error", error: true, id: null});
    }
}