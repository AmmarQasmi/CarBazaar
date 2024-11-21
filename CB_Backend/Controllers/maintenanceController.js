const pool = require("../DB/connect"); // Import the database pool
const { sendEmail } = require("../utils/emailService"); // Import email service

// Maintenance Controller
exports.maintenanceController = async (req, res) => {
  const {
    service_date,
    service_description,
    cost,
    service_center,
    services_service_id,
    vehicle_v_id,
    users_u_id,
    appointment_date,
    appointment_time,
    service_location,
    additional_details,
    email, // Add the email field from the user
  } = req.body;

  // Validate required fields
  if (!service_date || !service_description || !cost || !service_center || !services_service_id || !vehicle_v_id || !users_u_id || !email) {
    return res.status(400).json({
      status: "error",
      message:
        "Please provide all required fields: service_date, service_description, cost, service_center, services_service_id, vehicle_v_id, users_u_id, email",
    });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN"); // Begin transaction

    // Insert maintenance record
    const insertMaintenanceQuery = `
      INSERT INTO MAINTENANCE (
        service_date,
        service_description,
        cost,
        service_center,
        services_service_id,
        vehicle_v_id,
        users_u_id,
        appointment_date,
        appointment_time,
        service_location,
        additional_details
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
      RETURNING *;
    `;
    const maintenanceResult = await client.query(insertMaintenanceQuery, [
      service_date,
      service_description,
      cost,
      service_center,
      services_service_id,
      vehicle_v_id,
      users_u_id,
      appointment_date,
      appointment_time,
      service_location,
      additional_details,
    ]);

    await client.query("COMMIT");

    // Send confirmation email
    const subject = "Maintenance Registration Confirmation";
    const text = `Hello, your maintenance request has been registered successfully. Service Details:
    - Date: ${service_date}
    - Description: ${service_description}
    - Cost: ${cost}
    - Service Center: ${service_center}`;

    const html = `
      <h1>Maintenance Registration Confirmation</h1>
      <p>Hello, your maintenance request has been registered successfully. Below are the details:</p>
      <ul>
        <li><strong>Date:</strong> ${service_date}</li>
        <li><strong>Description:</strong> ${service_description}</li>
        <li><strong>Cost:</strong> ${cost}</li>
        <li><strong>Service Center:</strong> ${service_center}</li>
      </ul>
      <p>Thank you for choosing CB Bazaar!</p>
    `;

    await sendEmail(email, subject, text, html); // Send the email

    // Respond with success
    res.status(201).json({
      status: "success",
      message: "Maintenance record created successfully and email sent",
      data: maintenanceResult.rows[0],
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error during maintenance creation:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  } finally {
    client.release();
  }
};

// Get all maintenance records
exports.getAllMaintenance = async (req, res) => {
    const client = await pool.connect();
    try {
        const getMaintenanceQuery = 'SELECT * FROM MAINTENANCE';
        const maintenanceResult = await client.query(getMaintenanceQuery);

        res.status(200).json({
            status: "success",
            data: maintenanceResult.rows // Return all maintenance records
        });
    } catch (error) {
        console.error("Error fetching maintenance records:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    } finally {
        client.release(); // Release the client back to the pool
    }
};

// Get maintenance record by ID
exports.getMaintenanceById = async (req, res) => {
    const { maintenance_id } = req.params;

    const client = await pool.connect();
    try {
        const getMaintenanceQuery = 'SELECT * FROM MAINTENANCE WHERE maintenance_id = $1';
        const maintenanceResult = await client.query(getMaintenanceQuery, [maintenance_id]);

        if (maintenanceResult.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Maintenance record not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: maintenanceResult.rows[0] // Return the maintenance record
        });
    } catch (error) {
        console.error("Error fetching maintenance record:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    } finally {
        client.release(); // Release the client back to the pool
    }
};

// Update maintenance record
exports.updateMaintenance = async (req, res) => {
    const { maintenance_id } = req.params;
    const {
        service_date, 
        service_description, 
        cost, 
        service_center, 
        services_service_id, 
        vehicle_v_id, 
        users_u_id, 
        appointment_date, 
        appointment_time, 
        service_location, 
        additional_details
    } = req.body;

    // Validate required fields
    if (!service_date || !service_description || !cost || !service_center || !services_service_id || !vehicle_v_id || !users_u_id) {
        return res.status(400).json({
            status: "error",
            message: "Please provide all required fields: service_date, service_description, cost, service_center, services_service_id, vehicle_v_id, users_u_id"
        });
    }

    const client = await pool.connect();
    try {
        const updateMaintenanceQuery = `
            UPDATE MAINTENANCE
            SET service_date = $1, 
                service_description = $2, 
                cost = $3, 
                service_center = $4, 
                services_service_id = $5, 
                vehicle_v_id = $6, 
                users_u_id = $7,
                appointment_date = $8,
                appointment_time = $9,
                service_location = $10,
                additional_details = $11
            WHERE maintenance_id = $12 RETURNING *;
        `;
        
        const updatedMaintenanceResult = await client.query(updateMaintenanceQuery, [
            service_date, 
            service_description, 
            cost, 
            service_center, 
            services_service_id, 
            vehicle_v_id, 
            users_u_id,
            appointment_date,
            appointment_time,
            service_location,
            additional_details,
            maintenance_id
        ]);

        if (updatedMaintenanceResult.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Maintenance record not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Maintenance record updated successfully",
            data: updatedMaintenanceResult.rows[0] // Return updated maintenance record
        });
    } catch (error) {
        console.error("Error updating maintenance record:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    } finally {
        client.release(); // Release the client back to the pool
    }
};

// Delete maintenance record
exports.deleteMaintenance = async (req, res) => {
    const { maintenance_id } = req.params;

    const client = await pool.connect();
    try {
        const deleteMaintenanceQuery = 'DELETE FROM MAINTENANCE WHERE maintenance_id = $1 RETURNING *';
        const deletedMaintenanceResult = await client.query(deleteMaintenanceQuery, [maintenance_id]);

        if (deletedMaintenanceResult.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Maintenance record not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Maintenance record deleted successfully",
            data: deletedMaintenanceResult.rows[0] // Return deleted maintenance record
        });
    } catch (error) {
        console.error("Error deleting maintenance record:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    } finally {
        client.release(); // Release the client back to the pool
    }
};
