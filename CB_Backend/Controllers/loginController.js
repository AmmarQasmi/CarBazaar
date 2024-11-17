const pool = require("../DB/connect");

exports.loginController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]); 

        if (user.rows.length > 0) {
            await pool.query('UPDATE users SET is_login = $1 WHERE email = $2', ['Y', email]);
            return res.status(200).json({ message: 'Login successful.', user: user.rows[0] });
        } else {
            return res.status(401).json({ message: 'Invalid credentials.', is_login: 'N' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.adminLoginController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2 AND role_id = 1', [email, password]);

        if (user.rows.length > 0) {
            await pool.query('UPDATE users SET is_login = $1 WHERE email = $2', ['Y', email]);
            return res.status(200).json({ message: 'Admin login successful.', user: user.rows[0] });
        } else {
            return res.status(401).json({ message: 'Invalid credentials or not an admin.', is_login: 'N' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
