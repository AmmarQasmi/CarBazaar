const pool = require("../DB/connect"); // Import the database pool
const { sendEmail } = require("../utils/emailService"); // Import email service

exports.purchaseController = async (req, res) => {
    const {
        purchase_price,
        payment_type,
        post_post_id,
        vehicle_v_id,
        email,
    } = req.body;

    console.log('Received purchase request:', req.body);

    if (!purchase_price || !payment_type || !post_post_id || !vehicle_v_id || !email) {
        console.error('Missing required fields in request');
        return res.status(400).json({ message: "Missing required fields in request" });
    }

    let client;
    try {
        client = await pool.connect();
        await client.query("BEGIN");

        // Validate vehicle availability
        const vehicleCheckQuery = `
            SELECT V_status, offeredby FROM VEHICLE WHERE V_id = $1
        `;
        const vehicleCheckResult = await client.query(vehicleCheckQuery, [vehicle_v_id]);

        if (vehicleCheckResult.rows.length === 0) {
            console.error(`Vehicle not found for V_id: ${vehicle_v_id}`);
            await client.query("ROLLBACK");
            return res.status(400).json({ message: "Vehicle not found." });
        }

        const vehicle = vehicleCheckResult.rows[0];
        console.log('Vehicle check result:', vehicle);

        if (vehicle.v_status.toLowerCase() !== "available") {
            console.error(`Vehicle not available. Status: ${vehicle.v_status}`);
            await client.query("ROLLBACK");
            return res.status(400).json({ message: "Vehicle is not available for purchase." });
        }

        if (vehicle.offeredby !== "CB") {
            console.error(`Vehicle not offered by CB. Offered by: ${vehicle.offeredby}`);
            await client.query("ROLLBACK");
            return res.status(400).json({ message: "Vehicle is not offered by CB." });
        }

        // Validate post
        const postCheckQuery = `
            SELECT post_id, status FROM POST WHERE post_id = $1 AND vehicle_v_id = $2
        `;
        const postCheckResult = await client.query(postCheckQuery, [post_post_id, vehicle_v_id]);

        if (postCheckResult.rows.length === 0) {
            console.error(`Post not found or does not match vehicle. Post ID: ${post_post_id}, Vehicle ID: ${vehicle_v_id}`);
            await client.query("ROLLBACK");
            return res.status(400).json({ message: "Post not found or does not match the vehicle." });
        }

        const post = postCheckResult.rows[0];
        console.log('Post check result:', post);

        if (post.status.toLowerCase() !== "available") {
            console.error(`Post is not available. Status: ${post.status}`);
            await client.query("ROLLBACK");
            return res.status(400).json({ message: "Post is not available for purchase." });
        }

        // Fetch user details
        const userCheckQuery = `
            SELECT U_id, name FROM USERS WHERE email = $1
        `;
        const userCheckResult = await client.query(userCheckQuery, [email]);

        if (userCheckResult.rows.length === 0) {
            console.error(`User not found for email: ${email}`);
            await client.query("ROLLBACK");
            return res.status(400).json({ message: "User not found." });
        }

        const userId = userCheckResult.rows[0].u_id;
        const userName = userCheckResult.rows[0].name;

        console.log('User check result:', { userId, userName });

        // Insert purchase record
        const purchaseDate = new Date().toISOString().split("T")[0];
        const insertPurchaseQuery = `
            INSERT INTO PURCHASE 
            (purchase_date, purchase_price, payment_type, users_u_id, post_post_id, vehicle_v_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING p_id
        `;
        const purchaseResult = await client.query(insertPurchaseQuery, [
            purchaseDate,
            purchase_price,
            payment_type,
            userId,
            post_post_id,
            vehicle_v_id,
        ]);

        console.log('Purchase inserted:', purchaseResult.rows[0]);

        // Update vehicle status
        await client.query("UPDATE VEHICLE SET V_status = $1 WHERE V_id = $2", ["Sold", vehicle_v_id]);
        console.log(`Vehicle status updated to Sold for V_id: ${vehicle_v_id}`);

        // Update post status
        await client.query("UPDATE POST SET status = $1 WHERE post_id = $2", ["Unavailable", post_post_id]);
        console.log(`Post status updated to Unavailable for post_id: ${post_post_id}`);

        await client.query("COMMIT");

        // Send email notifications
        try {
            // User's email content
            const userSubject = "Thank You for Your Inquiry! We Will Get in Touch Soon!";
                        const userText = `
                Hello ${userName},

                Thank you for your interest in purchasing a vehicle through our platform! We have received your inquiry and our team will be in touch with you soon regarding the next steps.

                Here are the details of your inquiry:
                - Vehicle ID: ${vehicle_v_id}
                - Payment Type: ${payment_type}
                - Inquiry Price: ${purchase_price}
                - Post ID: ${post_post_id}
                
                We appreciate your interest, and we'll contact you soon for further assistance.

                Best regards,
                The [Company Name] Team
            `;
            const userHtml = `
                <p>Hello <strong>${userName}</strong>,</p>
                <p>Thank you for your interest in purchasing a vehicle through our platform! We have received your inquiry and our team will be in touch with you soon regarding the next steps.</p>
                <p>Here are the details of your inquiry:</p>
                <ul>
                    <li><strong>Vehicle ID:</strong> ${vehicle_v_id}</li>
                    <li><strong>Payment Type:</strong> ${payment_type}</li>
                    <li><strong>Inquiry Price:</strong> ${purchase_price}</li>
                    <li><strong>Post ID:</strong> ${post_post_id}</li>
                </ul>
                <p>We appreciate your interest, and we'll contact you soon for further assistance.</p>
                <p>Best regards,</p>
                <p>The <strong>CarBazaar</strong> Team</p>
            `;

            // Send the email to the user
            await sendEmail(email, userSubject, userText, userHtml);
            console.log(`Inquiry email sent to user: ${email}`);

            // Admin's email content
            const adminEmail = process.env.EMAIL;
            const adminSubject = `New Purchase Inquiry - Post ID: ${post_post_id}`;
            const adminText = `
                    A potential customer has inquired about purchasing a vehicle through the platform:
                    - User: ${userName} (${email})
                    - Vehicle ID: ${vehicle_v_id}
                    - Inquiry Price: ${purchase_price}
                    - Payment Type: ${payment_type}
                    - Post ID: ${post_post_id}
                    
                    Please review the inquiry and contact the user to assist them with the next steps.
                `;
            const adminHtml = `
                <h2>A potential customer has inquired about purchasing a vehicle through the platform:</h2>
                <ul>
                    <li><strong>User:</strong> ${userName} (${email})</li>
                    <li><strong>Vehicle ID:</strong> ${vehicle_v_id}</li>
                    <li><strong>Inquiry Price:</strong> ${purchase_price}</li>
                    <li><strong>Payment Type:</strong> ${payment_type}</li>
                    <li><strong>Post ID:</strong> ${post_post_id}</li>
                </ul>
                <p>Please review the inquiry and contact the user to assist them with the next steps.</p>
            `;

            // Send the email to the admin
            await sendEmail(adminEmail, adminSubject, adminText, adminHtml);
            console.log(`Inquiry notification email sent to admin: ${adminEmail}`);

        } catch (emailError) {
            console.error('Failed to send email:', emailError);
            // You might want to implement a retry mechanism or alert system here
        }

        res.status(201).json({
            message: "Purchase successful",
            purchaseId: purchaseResult.rows[0].p_id,
            userName: userName,
        });
    } catch (err) {
        if (client) await client.query("ROLLBACK");
        console.error('Transaction error:', err);
        res.status(500).json({ message: "Failed to process purchase", error: err.message });
    } finally {
        if (client) client.release();
    }
};