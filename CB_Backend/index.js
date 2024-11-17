const express = require("express");
const cors = require('cors');
const app = express();
const pool = require("./DB/connect");

const LoginRouter = require("./Routes/login");
const UserRouter = require("./Routes/users");
const AdminLoginRouter = require("./Routes/AdminLogin");
const VehicleRouter = require("./Routes/Vehicle");
const SignupRouter = require("./Routes/Signup");
const PurchaseRouter = require("./Routes/purchase");
const MaintenanceRouter = require("./Routes/maintenance");
const InsuranceRouter = require("./Routes/insurance");
const PostRouter = require("./Routes/post");
const ContactRouter = require("./Routes/contact");

const PORT = process.env.PORT || 5000; // Default to 5001 if the env variable is not set
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));


app.use("/api", UserRouter); 
app.use("/api", LoginRouter); 
app.use("/api", AdminLoginRouter); 
app.use("/api", SignupRouter); 
app.use("/api", PurchaseRouter); 
app.use("/api", VehicleRouter); 
app.use("/api", MaintenanceRouter); 
app.use("/api", InsuranceRouter); 
app.use("/api", PostRouter); 
app.use("/api", ContactRouter); 

// Test database connection and start server
app.listen(PORT, () => {
  // Check the DB connection once the server is started
  pool.connect((err, client, release) => {
    if (err) {
      console.error('Error connecting to the database', err.stack);
      process.exit(1); // Exit if there's an error with the DB connection
    } else {
      console.log('Connected to carBazaar database');
    }
  });

  console.log(`Server running on port ${PORT}`);
});

process.on('SIGINT', () => {
  pool.end((err) => {
    if (err) {
      console.error('Error during disconnection', err.stack);
    } else {
      console.log('Disconnected from the database');
    }
    process.exit(0);
  });
});
