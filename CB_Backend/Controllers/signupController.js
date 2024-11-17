const pool = require("../DB/connect"); // Import the database pool
const { sendEmail } = require("../util/emailService"); // Import email service

// Signup Controller
exports.signupController = async (req, res) => {
  const { name, email, password, phone_no } = req.body;

  // Check if all fields are provided
  if (!name || !email || !password || !phone_no) {
    return res.status(400).json({
      status: "error",
      message: "Please provide all required fields (name, email, password, phone number)",
    });
  }

  // Check if the user already exists in the database
  const checkUserQuery = `SELECT * FROM users WHERE email = $1`;
  try {
    const userExists = await pool.query(checkUserQuery, [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "User with this email already exists",
      });
    }

    // Insert the new user into the users table
    const insertUserQuery = `
      INSERT INTO users (name, email, password, phone_no, role_id)
      VALUES ($1, $2, $3, $4, 2) RETURNING *;
    `;

    const result = await pool.query(insertUserQuery, [name, email, password, phone_no]);

    // Send a welcome email to the user
    const emailSubject = "Welcome to Our Service!";
    const emailBody = `
      Hi ${name},
      
      Welcome to Our Service! We're thrilled to have you on board. 
      
      If you have any questions, feel free to reach out to us.
      
      Best regards,
      The Team
    `;

    try {
      await sendEmail(email, emailSubject, emailBody); // Call the sendEmail function
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: "error",
        message: "User created but email could not be sent",
      });
    }

    // Return a success response with the created user
    res.status(201).json({
      status: "success",
      message: "User created successfully and welcome email sent",
      data: result.rows[0], // Returning the user data (excluding password)
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};