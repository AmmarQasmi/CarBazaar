const pool = require("../DB/connect"); // Import the database pool
const { sendEmail } = require("../util/emailService"); // Import email service

// Create a new post
exports.createPost = async (req, res) => {
    const { price, description, email, make, model, year, fuel_type, mileage } = req.body;
    let uploadedImages = [];

    if (req.files) {
        uploadedImages = req.files.map(file => `/uploads/${file.filename}`);
    } else if (images) {
        uploadedImages = images.split(','); // Handle case where images are URLs
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

        const vehicleImage = uploadedImages[0] || images.split(",")[0]; // Use the first image as the vehicle image
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
        INSERT INTO POST (price, description, seller_id, images, users_u_id, vehicle_v_id, vehicle_users_u_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
      `;
        const postResult = await pool.query(insertPostQuery, [
            price,
            description,
            users_u_id, // Use the user's ID as the seller ID
            uploadedImages.length > 0 ? uploadedImages.join(',') : images, // Store the image paths as a comma-separated string
            users_u_id,
            vehicle_v_id,
            users_u_id,
        ]);

        // Prepare email content
        const emailSubject = "Post Created Successfully!";
        const emailText = `
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

        const emailHtml = `
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

        // Send confirmation email
        try {
            await sendEmail(email, emailSubject, emailText, emailHtml);
        } catch (emailError) {
            console.error("Error sending email:", emailError);
            return res.status(500).json({
                status: "error",
                message: "Post created, but email could not be sent",
            });
        }

        // Respond to the client
        return res.status(201).json({
            status: "success",
            message: "Post created successfully and email sent",
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

// Get all posts
exports.getAllPosts = async (req, res) => {
    const getAllPostsQuery = "SELECT * FROM POST";

    try {
        const result = await pool.query(getAllPostsQuery);
        res.status(200).json({
            status: "success",
            data: result.rows, // Returning all posts
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
exports.updatePosts = async (req, res) => {
    const { post_id } = req.params;
    const { price, description, images } = req.body;

    // Check if required fields are provided
    if (!price && !description && !images) {
        return res.status(400).json({
            status: "error",
            message: "Please provide at least one field to update (price, description, or images)",
        });
    }

    // Update the post in the database
    const updatePostQuery = `
    UPDATE POST
    SET price = COALESCE($1, price), description = COALESCE($2, description), images = COALESCE($3, images)
    WHERE post_id = $4
    RETURNING *;
  `;

    try {
        const result = await pool.query(updatePostQuery, [
            price, description, images, post_id
        ]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Post not found",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Post updated successfully",
            data: result.rows[0], // Returning the updated post data
        });
    } catch (error) {
        console.error("Error updating post:", error);
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


