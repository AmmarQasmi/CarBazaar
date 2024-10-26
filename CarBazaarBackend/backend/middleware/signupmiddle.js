import { db } from "../DB/connect.js";

export const checkSignupId = async (req,res,next,id) => {
    try {
        const data = await db.query("Select * from users where u_id = $1",[id]);
        if(data.rows.length === 0) {
            return res.status(404).json({message: "No user history found", error: true, id: null});
        }
        req.user = data.rows[0];
        next();
    } catch (error) {
        res.status(500).json({message: "Internal Server Error", error: true, id: null});
    }
}