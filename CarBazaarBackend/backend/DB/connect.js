import pg from "pg";

export const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "carBazaar",
  password: "ammar",
  port: "5432",
});
