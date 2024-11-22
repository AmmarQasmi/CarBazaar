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

// Register a Vehicle
exports.registerVehicle = async (req, res) => {
  const { vehicleMake, vehicleModel, vehicleYear, userEmail } = req.body;

  try {
      // Validate input
      if (!vehicleMake || !vehicleModel || !vehicleYear || !userEmail) {
          return res.status(400).json({ error: 'All fields are required' });
      }

      // Fetch User ID using email
      const userQuery = 'SELECT U_id FROM USERS WHERE email = $1';
      const userResult = await pool.query(userQuery, [userEmail]);

      if (userResult.rows.length === 0) {
          return res.status(404).json({ error: 'User not found' });
      }

      const userId = userResult.rows[0].u_id;

      // Generate random placeholder data for other fields
      const randomMileage = Math.floor(Math.random() * 200000) + 1; // Random mileage
      const randomPrice = (Math.random() * 10000 + 5000).toFixed(2); // Random price
      const randomImage = 'https://via.placeholder.com/150'; // Placeholder image
      const randomDescription = 'Description not provided';

      // Insert into VEHICLE table
      const vehicleQuery = `
          INSERT INTO VEHICLE 
          (make, model, year, fuel_type, mileage, price, vehicle_image, description, users_u_id, V_status, offeredby) 
          VALUES ($1, $2, $3, 'Unknown', $4, $5, $6, $7, $8, 'NOT FOR SALE', 'none') 
          RETURNING V_id;
      `;
      const vehicleResult = await pool.query(vehicleQuery, [
          vehicleMake,
          vehicleModel,
          vehicleYear,
          randomMileage,
          randomPrice,
          randomImage,
          randomDescription,
          userId,
      ]);

      const vehicleId = vehicleResult.rows[0].v_id;

      // Respond with User ID and Vehicle ID
      res.status(201).json({ userId, vehicleId });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
  }
};

