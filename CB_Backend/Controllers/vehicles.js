const pool = require("../DB/connect"); // Import database pool

// Get all vehicles
exports.getAllVehicles = async (req, res) => {
  const query = `SELECT * FROM vehicle;`;
  try {
    const result = await pool.query(query);
    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  } catch (error) {
    console.error("Database Query Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete a vehicle by ID
exports.deleteVehicle = async (req, res) => {
    const { id } = req.params; // Get the vehicle ID from the URL parameter
    const query = `DELETE FROM vehicle WHERE v_id = $1 RETURNING *;`;
    
    try {
      const result = await pool.query(query, [id]);
      if (result.rows.length === 0) {
        return res.status(404).send("Vehicle not found");
      }
      res.status(200).json({
        status: "success",
        message: "Vehicle deleted successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Database Delete Error:", error);
      res.status(500).send("Internal Server Error");
    }
  };

// Sort vehicles in ascending order by model name
exports.sortVehiclesByName = async (req, res) => {
    const query = `SELECT * FROM vehicle ORDER BY model ASC;`;
    
    try {
      const result = await pool.query(query);
      res.status(200).json({
        status: "success",
        data: result.rows,
      });
    } catch (error) {
      console.error("Database Sort Error:", error);
      res.status(500).send("Internal Server Error");
    }
  };

  
