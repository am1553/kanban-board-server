import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./router.js";
import { createUser, deleteUser, signin } from "./handlers/users.js";
import { protect } from "./modules/auth.js";
import pool from "./db.js";
const app = express();
// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const checkDatabaseConnection = async (req, res, next) => {
  try {
    await pool.query("SELECT 1");
    next();
  } catch (error) {
    return res.status(500).json({ error: "Database connection failed" });
  }
};
app.use(checkDatabaseConnection);
// ROUTES
// users
app.post("/users", createUser);
app.post("/signin", signin);
app.delete("/users/:id", deleteUser);
app.use("/api/v1", protect, router);

export default app;
