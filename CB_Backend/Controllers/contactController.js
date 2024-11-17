const pool = require("../DB/connect"); // Import the database pool
const { sendEmail } = require("../util/emailService"); // Import email service

// Create Contact Us Controller
exports.createContactUs = async (req, res) => {
  const { user_id, name, email, phone, subject, message } = req.body;

  // Ensure all required fields are provided
  if (!subject || !name || !email || !phone || !message) {
    return res.status(400).json({ message: "Subject, Name, Email, Phone number, and Message are required." });
  }

  try {
    // Step 1: Insert the contact us request into the database
    const query = `INSERT INTO contact_us (name, email, phone, subject, message, status)
                   VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    const values = [name, email, phone, subject, message, 'Pending'];

    const result = await pool.query(query, values);

    const newContactUsRequest = result.rows[0]; // Get the newly created contact us request

    // Step 2: Send an email notification to the user
    const userSubject = `Thank you for contacting us - ${subject}`;
    const userText = `
    Thank you for contacting us, ${name}! 

    We have received your query with the following details:
                 \nName: ${name}
                 \nEmail: ${email}
                 \nPhone: ${phone}
                 \nSubject: ${subject}
                 \nMessage: ${message}
                 
    Our team will contact you shortly after reviewing your request.`;

    const userHtml = `<p>Thank you for contacting us, ${name}!</p>

    <p>We have received your query with the following details:</p>
                  <ul>
                    <li><strong>Name:</strong> ${name}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Phone:</strong> ${phone}</li>
                    <li><strong>Subject:</strong> ${subject}</li>
                    <li><strong>Message:</strong> ${message}</li>
                  </ul>
                <p>Our team will contact you shortly after reviewing your request.</p>`;

    await sendEmail(email, userSubject, userText, userHtml);

    // Step 3: Send an email notification to the website's email address
    const websiteEmail = process.env.EMAIL; 
    const adminSubject = `New Contact Us Request - ${subject}`;
    const adminText = `
    A new contact request has been received:
                 \nName: ${name}
                 \nEmail: ${email}
                 \nPhone: ${phone}
                 \nSubject: ${subject}
                 \nMessage: ${message}`;

    const adminHtml = `<h2>A new contact request has been received:</h2>
                  <ul>
                    <li><strong>Name:</strong> ${name}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Phone:</strong> ${phone}</li>
                    <li><strong>Subject:</strong> ${subject}</li>
                    <li><strong>Message:</strong> ${message}</li>
                  </ul>`;

    await sendEmail(websiteEmail, adminSubject, adminText, adminHtml);

    // Step 4: Send a response back to the client
    return res.status(201).json({
      message: "Contact Us request submitted successfully!",
      contactUsRequest: newContactUsRequest,
    });
  } catch (error) {
    console.error("Error creating contact us request:", error);
    return res.status(500).json({ message: "An error occurred while processing your request." });
  }
};

// Get all Contact Us requests
exports.getAllContactUsRequests = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contact_us ORDER BY created_at DESC");
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching contact us requests:", error);
    return res.status(500).json({ message: "An error occurred while fetching contact requests." });
  }
};

// Get a specific Contact Us request by contact_id
exports.getContactUsById = async (req, res) => {
  const { contact_id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM contact_us WHERE contact_id = $1", [contact_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Contact request not found." });
    }
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching contact us request by ID:", error);
    return res.status(500).json({ message: "An error occurred while fetching the contact request." });
  }
};

// Update a Contact Us request
exports.updateContactUs = async (req, res) => {
  const { contact_id } = req.params;
  const { status } = req.body; // Update only the status

  try {
    const result = await pool.query(
      `UPDATE contact_us
       SET status = $1
       WHERE contact_id = $2 RETURNING *`,
      [status, contact_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Contact request not found for update." });
    }

    return res.status(200).json({
      message: "Contact Us request updated successfully.",
      contactUsRequest: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating contact us request:", error);
    return res.status(500).json({ message: "An error occurred while updating the contact request." });
  }
};

// Delete a Contact Us request
exports.deleteContactUs = async (req, res) => {
  const { contact_id } = req.params;
  try {
    const result = await pool.query("DELETE FROM contact_us WHERE contact_id = $1 RETURNING *", [contact_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Contact request not found for deletion." });
    }

    return res.status(200).json({
      message: "Contact Us request deleted successfully.",
      deletedRequest: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting contact us request:", error);
    return res.status(500).json({ message: "An error occurred while deleting the contact request." });
  }
};
