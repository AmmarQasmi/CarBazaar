const pool = require("../DB/connect"); // Import database pool

// Get all users
exports.getAllUsers = async (req, res) => {
  const query = `SELECT * FROM users;`;
  try {
    const result = await pool.query(query);
    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  } catch (error) {
    console.error("Database Query Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getUsersbyID = async (req, res) => {
  const { id } = req.params; // Extracting the user ID from the request parameters
  const query = `SELECT * FROM users WHERE u_id = $1;`; 

  try {
    const result = await pool.query(query, [id]); // Pass the ID as a parameter to the query
    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  } catch (error) {
    console.error("Database Query Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Add a new user
exports.addUser = async (req, res) => {
  const { email, name, password, profile_pic, cover_pic, phone_no, role_id } =
    req.body;
  const query = `
    INSERT INTO users (email, name, password, profile_pic, cover_pic, phone_no, role_id, is_login)
    VALUES ($1, $2, $3, $4, $5, $6, $7, 'N')
    RETURNING *;
  `;
  try {
    const result = await pool.query(query, [
      email,
      name,
      password,
      profile_pic,
      cover_pic,
      phone_no,
      role_id,
    ]);
    res.status(201).json({
      status: "success",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Database Insert Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update a user
exports.updateUserDetails = async (req, res) => {
  const { id } = req.params;
  const { email, name, password } = req.body; // Destructure email, name, password from request body

  const query = `
    UPDATE users
    SET email = $1, name = $2, password = $3
    WHERE u_id = $4
    RETURNING *;
  `;
  try {
    const result = await pool.query(query, [email, name, password, id]);

    if (result.rows.length === 0) {
      return res.status(404).send("User not found");
    }

    res.status(200).json({
      status: "success",
      data: result.rows[0], // Return the updated user record
    });
  } catch (error) {
    console.error("Database Update Error:", error);
    res.status(500).send("Internal Server Error");
  }
};
exports.updateUserLogin = async (req, res) => {
  const { id } = req.params; // Extract user ID from route parameters
  const { is_login } = req.body; // Extract `is_login` value from the request body

  if (!id || typeof is_login !== 'string') {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  const query = `UPDATE users SET is_login = $1 WHERE u_id = $2 RETURNING *;`;

  try {
    const result = await pool.query(query, [is_login, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      status: 'success',
      data: result.rows[0], // Return the updated user record
    });
  } catch (error) {
    console.error('Database Update Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM users WHERE u_id = $1 RETURNING *;`;
  try {
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Database Delete Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Sort users in ascending order by name
exports.sortUsers = async (req, res) => {
  const query = "SELECT * FROM users ORDER BY name ASC";

  try {
    const result = await pool.query(query);

    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  } catch (error) {
    console.error("Database Sort Error:", error);
    res.status(500).send("Internal Server Error");
  }
};
