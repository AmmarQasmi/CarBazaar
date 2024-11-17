const pool = require("../DB/connect"); // Import the database pool
const { sendEmail } = require("../util/emailService"); // Import email service

// Create a new post
exports.createPost = async (req, res) => {
    const { price, description, seller_id, images, users_u_id, vehicle_v_id, vehicle_users_u_id, email } = req.body;

    // Check if all fields are provided
    if (!price || !description || !seller_id || !images || !users_u_id || !vehicle_v_id || !vehicle_users_u_id || !email) {
        return res.status(400).json({
            status: "error",
            message: "Please provide all required fields (price, description, seller_id, images, users_u_id, vehicle_v_id, vehicle_users_u_id, email)",
        });
    }

    // Insert the new post into the database
    const insertPostQuery = `
    INSERT INTO POST (price, description, seller_id, images, users_u_id, vehicle_v_id, vehicle_users_u_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
  `;

    try {
        const result = await pool.query(insertPostQuery, [
            price, description, seller_id, images, users_u_id, vehicle_v_id, vehicle_users_u_id
        ]);

        //send confirmation email who posted the vehicle ad
        const emailSubject = "Post Created Successfully!";
        const emailText = `
            Hi there,
            
            Your post has been created successfully on our platform. Below are the details:
            
            Price: $${price}
            Description: ${description}
            Images: ${images}
            
            Thank you for using our service!
            
            Best regards,
            The Team
            `;

        const emailHtml = `
            <html>
                <head>
                <style>
                    body {
                    font-family: Arial, sans-serif;
                    color: #333;
                    line-height: 1.6;
                    }
                    .email-header {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px;
                    text-align: center;
                    }
                    .email-content {
                    margin: 20px;
                    }
                    .email-content p {
                    font-size: 16px;
                    }
                    .email-details {
                    border: 1px solid #ddd;
                    padding: 10px;
                    margin-top: 10px;
                    }
                    .email-details table {
                    width: 100%;
                    border-collapse: collapse;
                    }
                    .email-details th, .email-details td {
                    padding: 8px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                    }
                    .email-footer {
                    margin-top: 20px;
                    font-size: 14px;
                    text-align: center;
                    color: #777;
                    }
                </style>
                </head>
                <body>
                <div class="email-header">
                    <h2>Your Post Has Been Created!</h2>
                </div>
                
                <div class="email-content">
                    <p>Hi there,</p>
                    
                    <p>Your post has been created successfully on our platform. Below are the details:</p>
                    
                    <div class="email-details">
                    <table>
                        <tr>
                        <th>Price</th>
                        <td>$${price}</td>
                        </tr>
                        <tr>
                        <th>Description</th>
                        <td>${description}</td>
                        </tr>
                        <tr>
                        <th>Images</th>
                        <td>${images}</td>
                        </tr>
                    </table>
                    </div>

                    <p>Thank you for using our service!</p>
                </div>
                
                <div class="email-footer">
                    <p>Best regards,<br>The Team</p>
                </div>
                </body>
            </html>
            `;

        try {
            // Send the email to the user's email address (passed in the request body)
            await sendEmail(email, emailSubject, emailText, emailHtml); // Send email using the provided email address
        } catch (emailError) {
            console.error("Error sending email:", emailError);
            return res.status(500).json({
                status: "error",
                message: "Post created, but email could not be sent",
            });
        }

        // Respond to the client with the newly created post details
        return res.status(201).json({
            status: "success",
            message: "Post created successfully and email sent",
            post: result.rows[0],
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
