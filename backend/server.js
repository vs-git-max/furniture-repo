//dependencies
import express from "express";
import dotenv from "dotenv";
import connectToDataBase from "./config/db.js";
import cookieParser from "cookie-parser";

//routes imports
import authRoutes from "./routes/auth.router.js";
import userRoutes from "./routes/user.route.js";

//dotenv configuration
dotenv.config();

//creating the app
const app = express();
app.use(express.json());
app.use(cookieParser());

//the port
const PORT = process.env.PORT || 5000;

//routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, (req, res) => {
  connectToDataBase();
  console.log(`Server is running on port ${PORT}`);
});
