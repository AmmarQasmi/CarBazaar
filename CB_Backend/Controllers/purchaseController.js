const pool = require("../DB/connect"); // Import PostgreSQL pool

exports.purchaseController = async (req, res) => {
  const {
    purchase_price,
    payment_status,
    payment_type,
    users_u_id,
    post_post_id,
    vehicle_v_id,
  } = req.body;

  try {
    // Begin transaction
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Validate vehicle availability
      const vehicleCheckQuery = `
        SELECT V_status FROM VEHICLE WHERE V_id = $1
      `;
      const vehicleCheckResult = await client.query(vehicleCheckQuery, [vehicle_v_id]);

      if (vehicleCheckResult.rows.length === 0 || vehicleCheckResult.rows[0].v_status !== "Available") {
        return res.status(400).json({ message: "Vehicle is not available for purchase." });
      }

      // Validate post availability
      const postCheckQuery = `
        SELECT status FROM POST WHERE post_id = $1
      `;
      const postCheckResult = await client.query(postCheckQuery, [post_post_id]);

      if (postCheckResult.rows.length === 0 || postCheckResult.rows[0].status !== "available") {
        return res.status(400).json({ message: "Post is not available." });
      }

      // Insert purchase record
      const purchaseDate = new Date().toISOString().split("T")[0]; // Get current date
      const insertPurchaseQuery = `
        INSERT INTO PURCHASE 
          (purchase_date, purchase_price, payment_status, payment_type, users_u_id, post_post_id, vehicle_v_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING p_id
      `;
      const purchaseResult = await client.query(insertPurchaseQuery, [
        purchaseDate,
        purchase_price,
        payment_status,
        payment_type,
        users_u_id,
        post_post_id,
        vehicle_v_id,
      ]);

      // Update vehicle status
      const updateVehicleQuery = `
        UPDATE VEHICLE SET V_status = $1 WHERE V_id = $2
      `;
      await client.query(updateVehicleQuery, ["Sold", vehicle_v_id]);

      // Update post status
      const updatePostQuery = `
        UPDATE POST SET status = $1 WHERE post_id = $2
      `;
      await client.query(updatePostQuery, ["Unavailable", post_post_id]);

      // Commit transaction
      await client.query("COMMIT");

      res.status(201).json({
        message: "Purchase successful",
        purchaseId: purchaseResult.rows[0].p_id,
      });
    } catch (err) {
      await client.query("ROLLBACK");
      console.error(err);
      res.status(500).json({ message: "Failed to process purchase", error: err.message });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database connection error", error: err.message });
  }
};

