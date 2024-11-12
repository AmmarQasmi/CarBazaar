import { db } from "../DB/connect.js";
import express from "express";
import { checkVehicleId } from "../middleware/vehiclesmiddle.js";

const VehicleRouter = express.Router();

// Get all vehicles
VehicleRouter.get("/cars", async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM vehicle'); // Correct table name

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No vehicles found", error: true });
        }

        return res.status(200).json({ message: "Vehicles found", vehicles: result.rows, error: false });
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        return res.status(500).json({ message: "Internal server error", error: true });
    }
});

// Middleware to check vehicle existence by ID
VehicleRouter.param("id", checkVehicleId);

// Get vehicle by ID along with its posts (make sure fetchVehiclePosts is defined if needed)
VehicleRouter.get("/vehicle/:id", async (req, res) => {
    try {
        const vehicle = req.user; // The vehicle data attached by the middleware
        const vehicleId = vehicle.V_id; // Using the V_id from req.user

        // Optionally, fetch posts related to this vehicle
        const postsResult = await db.query("SELECT * FROM posts WHERE vehicle_v_id = $1", [vehicleId]);

        return res.status(200).json({ message: "Vehicle found", vehicle: { ...vehicle, posts: postsResult.rows }, error: false });
    } catch (error) {
        console.error("Error fetching vehicle by ID:", error);
        return res.status(500).json({ message: "Internal server error", error: true });
    }
});

// Delete vehicle by ID
VehicleRouter.delete("/vehicle/:id", async (req, res) => {
    try {
        const vehicleId = req.user.V_id; // Using V_id from req.user
        const deleteResult = await db.query("DELETE FROM vehicle WHERE V_id = $1", [vehicleId]);

        if (deleteResult.rowCount === 0) {
            return res.status(404).json({ message: "Vehicle not found", error: true });
        }

        res.status(200).json({ message: "Vehicle removed successfully", error: false });
    } catch (error) {
        console.error("Error deleting vehicle:", error);
        res.status(500).json({ message: "Internal server error", error: true });
    }
});

export default VehicleRouter;
