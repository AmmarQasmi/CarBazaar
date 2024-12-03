const pool = require("../DB/connect"); // Import the database pool
const { sendEmail } = require("../utils/emailService"); // Import email service

exports.createPost = async (req, res) => {
    const { price, description, email, make, model, year, fuel_type, mileage } = req.body;
    let uploadedImages = [];

    if (req.files && req.files.length > 0) {
        uploadedImages = req.files.map(file => `/uploads/${file.filename}`);
    } else if (req.body.images) {
        uploadedImages = req.body.images.split(','); // Handle case where images are URLs
    }

    // Check if all required fields are provided
    if (!price || !description || !uploadedImages.length || !email || !make || !model || !year || !fuel_type || !mileage) {
        return res.status(400).json({
            status: "error",
            message: "Please provide all required fields (price, description, images, email, make, model, year, fuel_type, mileage)",
        });
    }

    try {
        // Fetch the user's ID from the email
        const fetchUserQuery = `SELECT U_id, name FROM USERS WHERE email = $1;`;
        const userResult = await pool.query(fetchUserQuery, [email]);

        if (userResult.rowCount === 0) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }

        const { u_id: users_u_id, name: seller_name } = userResult.rows[0];

        // Insert a new vehicle record
        const insertVehicleQuery = `
        INSERT INTO VEHICLE (make, model, year, fuel_type, mileage, price, description, users_u_id, vehicle_image)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING V_id;
      `;

        const vehicleImage = uploadedImages[0]; // Use the first image as the vehicle image
        const vehicleResult = await pool.query(insertVehicleQuery, [
            make,
            model,
            year,
            fuel_type,
            mileage,
            price,
            description,
            users_u_id,
            vehicleImage,
        ]);

        const vehicle_v_id = vehicleResult.rows[0].v_id;

        // Insert the post into the POST table
        const insertPostQuery = `
        INSERT INTO POST (description, users_u_id, vehicle_v_id)
        VALUES ($1, $2, $3) RETURNING *;
      `;
        const postResult = await pool.query(insertPostQuery, [
            description,
            users_u_id,
            vehicle_v_id,
        ]);

        // Prepare email content for the seller
        const emailSubjectUser = "Post Created Successfully!";
        const emailTextUser = `
            Hi ${seller_name},
            
            Your post has been created successfully on our platform. Below are the details:
            
            Price: $${price}
            Description: ${description}
            Make: ${make}
            Model: ${model}
            Year: ${year}
            
            Thank you for using our service!
            
            Best regards,
            The Team
        `;
        const emailHtmlUser = `
            <html>
            <body>
                <h2>Your Post Has Been Created!</h2>
                <p>Hi ${seller_name},</p>
                <p>Your post has been created successfully on our platform. Below are the details:</p>
                <ul>
                    <li><strong>Price:</strong> $${price}</li>
                    <li><strong>Description:</strong> ${description}</li>
                    <li><strong>Make:</strong> ${make}</li>
                    <li><strong>Model:</strong> ${model}</li>
                    <li><strong>Year:</strong> ${year}</li>
                </ul>
                <p>Thank you for using our service!</p>
                <p>Best regards,<br>The Team</p>
            </body>
            </html>
        `;

        // Prepare email content for the admin/company
        const companyEmail = process.env.EMAIL; // Ensure COMPANY_EMAIL is set in your environment variables
        const emailSubjectCompany = "New Post Created Notification";
        const emailTextCompany = `
            A new post has been created on the platform. Below are the details:
            
            Seller Name: ${seller_name}
            Email: ${email}
            Price: $${price}
            Description: ${description}
            Make: ${make}
            Model: ${model}
            Year: ${year}
        `;
        const emailHtmlCompany = `
            <html>
            <body>
                <h2>New Post Created</h2>
                <p>A new post has been created on the platform. Below are the details:</p>
                <ul>
                    <li><strong>Seller Name:</strong> ${seller_name}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Price:</strong> $${price}</li>
                    <li><strong>Description:</strong> ${description}</li>
                    <li><strong>Make:</strong> ${make}</li>
                    <li><strong>Model:</strong> ${model}</li>
                    <li><strong>Year:</strong> ${year}</li>
                </ul>
                <p>Please review the post and take necessary action if needed.</p>
                <p>Best regards,<br>The Team</p>
            </body>
            </html>
        `;

        // Send confirmation emails
        try {
            await sendEmail(email, emailSubjectUser, emailTextUser, emailHtmlUser); // Email to user
            await sendEmail(companyEmail, emailSubjectCompany, emailTextCompany, emailHtmlCompany); // Email to company/admin
        } catch (emailError) {
            console.error("Error sending email:", emailError);
            return res.status(500).json({
                status: "error",
                message: "Post created, but email(s) could not be sent",
            });
        }

        // Respond to the client
        return res.status(201).json({
            status: "success",
            message: "Post created successfully and emails sent",
            post: postResult.rows[0],
        });

    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({
            status: "error",
            message: "Failed to create post",
        });
    }
};
// Mark post as sold
exports.markPostAsSold = async (req, res) => {
    const { postId } = req.params; // Assuming postId is passed in the URL

    try {
        // Update the status of the post to 'sold'
        const updatePostQuery = `
            UPDATE POST
            SET status = $1
            WHERE post_id = $2
            RETURNING *;
        `;

        const result = await pool.query(updatePostQuery, ['sold', postId]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                status: "error",
                message: "Post not found",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Post marked as sold",
            post: result.rows[0], // Return the updated post details
        });

    } catch (error) {
        console.error("Error marking post as sold:", error);
        return res.status(500).json({
            status: "error",
            message: "Failed to mark post as sold",
        });
    }
};


// Get all posts
exports.getAllPosts = async (req, res) => {
    const getAllPostsQuery = `
        SELECT 
            POST.post_id,
            POST.description AS post_description,
            USERS.email AS seller_email,
            USERS.name AS seller_name,
            USERS.location AS location,
            USERS.phone_no AS seller_phone_no,
            VEHICLE.make AS vehicle_make,
            VEHICLE.model AS vehicle_model,
            VEHICLE.year AS vehicle_year,
            VEHICLE.fuel_type AS vehicle_fuel_type,
            VEHICLE.mileage AS vehicle_mileage,
            VEHICLE.price AS vehicle_price,
            VEHICLE.vehicle_image AS vehicle_image,
            VEHICLE.description AS vehicle_description,
            VEHICLE.offeredby AS vehicle_by,
            VEHICLE.v_status AS status
        FROM 
            POST
        INNER JOIN USERS ON POST.users_u_id = USERS.u_id
        INNER JOIN VEHICLE ON POST.vehicle_v_id = VEHICLE.v_id;
    `;

    try {
        const result = await pool.query(getAllPostsQuery);
        res.status(200).json({
            status: "success",
            data: result.rows, // Returning all posts with joined data including status
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};

// Get a post by ID
exports.getPostsById = async (req, res) => {
    const { post_id } = req.params;

    const getPostByIdQuery = "SELECT * FROM POST WHERE post_id = $1";

    try {
        const result = await pool.query(getPostByIdQuery, [post_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Post not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: result.rows[0], // Returning the post data
        });
    } catch (error) {
        console.error("Error fetching post by ID:", error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};

// Update a post by ID
exports.updatePost = async (req, res) => {
    const { post_id } = req.params;
    const { price, vehicle_image, description } = req.body;

    // Check if required fields are provided
    if (!price && !vehicle_image && !description) {
        return res.status(400).json({
            status: "error",
            message: "Please provide at least one field to update (price, vehicle_image, or description)",
        });
    }

    try {
        // Update the post description
        // COALESCE  Return the first non-null value in a list
        let updatePostQuery = `
            UPDATE POST
            SET description = COALESCE($1, description) 
            WHERE post_id = $2
            RETURNING *;
        `;

        // Execute the update query for post description
        const postResult = await pool.query(updatePostQuery, [description, post_id]);

        if (postResult.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Post not found",
            });
        }

        // Now update the vehicle price and vehicle image
        let updateVehicleQuery = `
            UPDATE VEHICLE
            SET price = COALESCE($1, price), vehicle_image = COALESCE($2, vehicle_image)
            WHERE v_id = (SELECT vehicle_v_id FROM POST WHERE post_id = $3)
            RETURNING *;
        `;

        // Execute the update query for vehicle price and image
        const vehicleResult = await pool.query(updateVehicleQuery, [price, vehicle_image, post_id]);

        if (vehicleResult.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Vehicle not found for this post",
            });
        }

        // Return success response with updated data
        res.status(200).json({
            status: "success",
            message: "Post and vehicle updated successfully",
            data: {
                post: postResult.rows[0],
                vehicle: vehicleResult.rows[0],
            }
        });
    } catch (error) {
        console.error("Error updating post and vehicle:", error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};

// Delete a post by ID
exports.deletePosts = async (req, res) => {
    const { post_id } = req.params;

    const deletePostQuery = "DELETE FROM POST WHERE post_id = $1 RETURNING *";

    try {
        const result = await pool.query(deletePostQuery, [post_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Post not found",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Post deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};


