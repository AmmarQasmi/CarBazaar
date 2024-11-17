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
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, name, password, profile_pic, cover_pic, phone_no, role_id } =
    req.body;

  const query = `
    UPDATE users
    SET email = $1, name = $2, password = $3, profile_pic = $4, cover_pic = $5, phone_no = $6, role_id = $7
    WHERE u_id = $8
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
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    res.status(200).json({
      status: "success",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Database Update Error:", error);
    res.status(500).send("Internal Server Error");
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
