// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import errorHandler from "errorhandler";
// import { db } from "./DB/connect.js";
// import purchaseRouter from "./Purchase/purchase.js";
// import SignupRouter from "./Signup/signup.js";
// import LoginRouter from "./Login/login.js";
// import AdminLoginRouter from "./Login/adminlogin.js";
// import UserRouter from "./Users/users.js";
// import VehicleRouter from "./Vehicle/cars.js";
// import PostRouter from "./Posts/post.js";
// const app = express();

// const PORT = 5000;

// //middlewares
// app.use(express.json()); //parse json 
// app.use(morgan('dev'));
// app.use(cors());
// app.use(errorHandler());

// //imported routes.
// app.use("/",purchaseRouter); //use the purchase router
// app.use("/",SignupRouter); //use the signup router 
// app.use("/", LoginRouter); // Use the login router
// app.use("/", AdminLoginRouter); // Use the admin login router
// app.use("/", UserRouter); // Use the user login router
// app.use("/", VehicleRouter); // Use the user login router
// // app.use('/api', PostRouter); // This will make your route available at /api/sell-car



// app.listen(PORT, () => {
//     db.connect((err) => {
//       if (err) {
//         console.error(err);
//       }
//       console.log("Connected to carBazaar");
//     });
//   });
  
//   process.on("SIGINT", () => {
//     db.end((err) => {
//       if (err) {
//         console.error("Error during disconnection", err.stack);
//       } else {
//         console.log("Disconnected from the database");
//       }
//       process.exit(0);
//     });
//   });
