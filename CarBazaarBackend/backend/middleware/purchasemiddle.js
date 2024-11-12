import { db } from "../DB/connect.js";

export const checkPurchaseId = async (req, res, next, id) => {
  try {
    // Fetch purchase by ID
    const data = await db.query("SELECT * FROM Purchase WHERE p_id = $1", [id]);
    
    // If no purchase is found with the provided ID
    if (data.rows.length === 0) {
      return res.status(404).json({ message: `No purchase history found for ID: ${id}`, error: true });
    }

    // Attach the purchase data to the request object
    req.Purchase = data.rows[0];  
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    // Log the error for debugging purposes (optional)
    console.error(`Error checking purchase ID: ${id}`, error);
    
    // Return a standardized error response
    return res.status(500).json({ message: "Internal Server Error", error: true });
  }
};
