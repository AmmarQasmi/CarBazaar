const pool = require("../DB/connect"); // Import the database pool
const { sendEmail } = require("../utils/emailService"); // Import email service

// Create Insurance Policy Controller
exports.createInsurancePolicy = async (req, res) => {
    const { coverage_amount, start_date, end_date, services_service_id, vehicle_v_id, users_u_id, email } = req.body;

    // Validate required fields
    if (!coverage_amount || !start_date || !end_date || !services_service_id || !users_u_id || !email) {
        return res.status(400).json({
            status: "error",
            message: "Please provide all required fields: coverage_amount, start_date, end_date, services_service_id, users_u_id, email"
        });
    }

    // Start a transaction
    const client = await pool.connect();
    try {
        await client.query('BEGIN'); // Begin transaction

        // Insert the insurance policy into the database
        const insertInsurancePolicyQuery = `
            INSERT INTO INSURANCE_POLICY (coverage_amount, start_date, end_date, services_service_id, vehicle_v_id, users_u_id)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
        `;
        const insurancePolicyResult = await client.query(insertInsurancePolicyQuery, [coverage_amount, start_date, end_date, services_service_id, vehicle_v_id || null, users_u_id]);

        // Commit the transaction
        await client.query('COMMIT');

        // Send confirmation email
        const subject = "Insurance Policy Confirmation";

        const text = `
            Dear Customer,

            We are pleased to confirm the successful creation of your insurance policy. Below are the policy details:

            - Coverage Amount: ${coverage_amount}
            - Policy Start Date: ${start_date}
            - Policy End Date: ${end_date}
            - Service ID: ${services_service_id}
            - Vehicle ID (if applicable): ${vehicle_v_id || "Not Provided"}
            - User ID: ${users_u_id}

            Thank you for choosing CB Bazaar for your insurance needs. Please keep this email for your records.

            Best regards,
            The CB Bazaar Team
            `;

        const html = `
            <h1>Insurance Policy Confirmation</h1>
            <p>Dear Customer,</p>
            <p>We are pleased to confirm the successful creation of your insurance policy. Below are the policy details:</p>
            <ul>
                <li><strong>Coverage Amount:</strong> ${coverage_amount}</li>
                <li><strong>Policy Start Date:</strong> ${start_date}</li>
                <li><strong>Policy End Date:</strong> ${end_date}</li>
                <li><strong>Service ID:</strong> ${services_service_id}</li>
                <li><strong>Vehicle ID (if applicable):</strong> ${vehicle_v_id || "Not Provided"}</li>
                <li><strong>User ID:</strong> ${users_u_id}</li>
            </ul>
            <p>Thank you for choosing CB Bazaar for your insurance needs. Please keep this email for your records.</p>
            <p>Best regards,</p>
            <p><strong>The CB Bazaar Team</strong></p>
            `;


        await sendEmail(email, subject, text, html); // Send the email


        // Return success response with the newly created insurance policy
        res.status(201).json({
            status: "success",
            message: "Insurance policy created successfully",
            data: insurancePolicyResult.rows[0] // Return the created insurance policy
        });
    } catch (error) {
        // Rollback in case of error
        await client.query('ROLLBACK');
        console.error("Error creating insurance policy:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    } finally {
        client.release(); // Release the client back to the pool
    }
};

// Get all insurance policies
exports.getAllInsurancePolicies = async (req, res) => {
    const client = await pool.connect();
    try {
        const getInsurancePoliciesQuery = 'SELECT * FROM INSURANCE_POLICY';
        const insurancePoliciesResult = await client.query(getInsurancePoliciesQuery);

        res.status(200).json({
            status: "success",
            data: insurancePoliciesResult.rows
        });
    } catch (error) {
        console.error("Error fetching insurance policies:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    } finally {
        client.release();
    }
};

// Get an insurance policy by policy number
exports.getInsurancePolicyById = async (req, res) => {
    const { policy_number } = req.params;

    const client = await pool.connect();
    try {
        const getInsurancePolicyQuery = 'SELECT * FROM INSURANCE_POLICY WHERE policy_number = $1';
        const insurancePolicyResult = await client.query(getInsurancePolicyQuery, [policy_number]);

        if (insurancePolicyResult.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Insurance policy not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: insurancePolicyResult.rows[0]
        });
    } catch (error) {
        console.error("Error fetching insurance policy:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    } finally {
        client.release();
    }
};

// Update an insurance policy
exports.updateInsurancePolicy = async (req, res) => {
    const { policy_number } = req.params;
    const { coverage_amount, start_date, end_date, services_service_id, vehicle_v_id, users_u_id } = req.body;

    // Validate required fields
    if (!coverage_amount || !start_date || !end_date || !services_service_id || !users_u_id) {
        return res.status(400).json({
            status: "error",
            message: "Please provide all required fields: coverage_amount, start_date, end_date, services_service_id, users_u_id"
        });
    }

    const client = await pool.connect();
    try {
        const updateInsurancePolicyQuery = `
            UPDATE INSURANCE_POLICY
            SET coverage_amount = $1, start_date = $2, end_date = $3, services_service_id = $4, vehicle_v_id = $5, users_u_id = $6
            WHERE policy_number = $7 RETURNING *;
        `;
        const updatedInsurancePolicyResult = await client.query(updateInsurancePolicyQuery, [coverage_amount, start_date, end_date, services_service_id, vehicle_v_id || null, users_u_id, policy_number]);

        if (updatedInsurancePolicyResult.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Insurance policy not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Insurance policy updated successfully",
            data: updatedInsurancePolicyResult.rows[0]
        });
    } catch (error) {
        console.error("Error updating insurance policy:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    } finally {
        client.release();
    }
};

// Delete an insurance policy
exports.deleteInsurancePolicy = async (req, res) => {
    const { policy_number } = req.params;

    const client = await pool.connect();
    try {
        const deleteInsurancePolicyQuery = 'DELETE FROM INSURANCE_POLICY WHERE policy_number = $1 RETURNING *';
        const deletedInsurancePolicyResult = await client.query(deleteInsurancePolicyQuery, [policy_number]);

        if (deletedInsurancePolicyResult.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Insurance policy not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Insurance policy deleted successfully",
            data: deletedInsurancePolicyResult.rows[0]
        });
    } catch (error) {
        console.error("Error deleting insurance policy:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    } finally {
        client.release();
    }
};
