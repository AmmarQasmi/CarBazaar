import express from "express";
import cors from "cors";
import morgan from "morgan";
import errorHandler from "errorhandler";
import { db } from "./DB/connect.js";
import purchaseRouter from "./Purchase/purchase.js";
const app = express();

const PORT = 5000;

//middlewares
app.use(express.json()); //parse json 
app.use(morgan('dev'));
app.use(cors());
app.use(errorHandler());

//imported routes.


app.use("/",purchaseRouter); //use the router for functionality



app.listen(PORT, () => {
    db.connect((err) => {
      if (err) {
        console.error(err);
      }
      console.log("Connected to carBazaar");
    });
  });
  
  process.on("SIGINT", () => {
    db.end((err) => {
      if (err) {
        console.error("Error during disconnection", err.stack);
      } else {
        console.log("Disconnected from the database");
      }
      process.exit(0);
    });
  });