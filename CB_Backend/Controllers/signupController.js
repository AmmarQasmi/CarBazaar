const pool = require("../DB/connect"); // Import the database pool
const { sendEmail } = require("../utils/emailService"); // Import email service

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
    const emailSubjectUser = "Welcome to Our Service!";
    const emailBodyUser = `
      Hi ${name},
      
      Welcome to Our Service! We're thrilled to have you on board. 
      
      If you have any questions, feel free to reach out to us.
      
      Best regards,
      The Team
    `;

    // Send a notification email to the company
    const companyEmail = process.env.EMAIL; // Ensure COMPANY_EMAIL is set in your environment variables
    const emailSubjectCompany = "New User Signup Notification";
    const emailBodyCompany = `
      A new user has signed up for the service. Below are their details:

      - Name: ${name}
      - Email: ${email}
      - Phone Number: ${phone_no}

      Please review and welcome them to the platform.
    `;

    try {
      // Send emails to both user and company
      await sendEmail(email, emailSubjectUser, emailBodyUser); // Welcome email to user
      await sendEmail(companyEmail, emailSubjectCompany, emailBodyCompany); // Notification email to company
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
      message: "User created successfully and emails sent",
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
