import { db } from "../DB/connect.js";

// Middleware to check if user exists by ID
export const checkVehicleId = async (req, res, next, id) => {
    try {
        const data = await db.query("SELECT * FROM vehicle WHERE V_id = $1", [id]); 

        if (data.rows.length === 0) {
            return res.status(404).json({ message: "No vehicle found with this ID", error: true, id: null });
        }

        req.user = data.rows[0]; // Set user data to req.user for further use
        next();
    } catch (error) {
        console.error("Error fetching vehicle by ID:", error);
        return res.status(500).json({ message: "Internal Server Error", error: true, id: null });
    }
}
