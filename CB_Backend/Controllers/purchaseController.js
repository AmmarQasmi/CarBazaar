const pool = require("../DB/connect"); // Import the database pool

// Purchase Controller
exports.purchaseController = async (req, res) => {
    const { purchase_price, payment_status, payment_type, users_u_id, post_post_id, post_users_u_id, vehicle_v_id } = req.body;

    // Validate required fields
    if (!purchase_price || !payment_status || !payment_type || !users_u_id || !post_post_id || !post_users_u_id || !vehicle_v_id) {
        return res.status(400).json({
            status: "error",
            message: "Please provide all required fields: purchase_price, payment_status, payment_type, users_u_id, post_post_id, post_users_u_id, vehicle_v_id"
        });
    }

    // Start a transaction
    const client = await pool.connect();
    try {
        await client.query('BEGIN'); // Begin transaction

        // Check if the post exists
        const checkPostQuery = 'SELECT * FROM post WHERE post_id = $1';
        const postResult = await client.query(checkPostQuery, [post_post_id]);
        
        if (postResult.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Post not found"
            });
        }

        // Insert purchase record into the PURCHASE table with CURRENT_DATE
        const insertPurchaseQuery = `
            INSERT INTO PURCHASE (purchase_date, purchase_price, payment_status, payment_type, users_u_id, post_post_id, post_users_u_id)
            VALUES (CURRENT_DATE, $1, $2, $3, $4, $5, $6) RETURNING *;
        `;
        const purchaseResult = await client.query(insertPurchaseQuery, [purchase_price, payment_status, payment_type, users_u_id, post_post_id, post_users_u_id]);

        // Delete the post and vehicle
        const deletePostQuery = 'DELETE FROM post WHERE post_id = $1';
        const VehicleQuery = 'update vehicle set V_status = "N/A" WHERE V_id = $1';

        await client.query(deletePostQuery, [post_post_id]);
        await client.query(VehicleQuery, [vehicle_v_id]);

        // Commit the transaction
        await client.query('COMMIT');

        // Return a success response with the created purchase record
        res.status(201).json({
            status: "success",
            message: "Purchase and deletion successful",
            data: purchaseResult.rows[0] // Returning the purchase data
        });
    } catch (error) {
        // Rollback the transaction in case of error
        await client.query('ROLLBACK');
        console.error("Error during purchase and deletion:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    } finally {
        client.release(); // Release the client back to the pool
    }
};
