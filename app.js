import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import doctorRoute from "./routes/doctorRoute.js";
import newsRoute from "./routes/newsRoute.js";
import galleryRoute from "./routes/galleryRoute.js";
import dotenv from "dotenv";
import opinionRoutes from "./routes/opinionRoute.js";
dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Middleware to enable CORS
app.use(cors());
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Route for Doctors
app.use("/doctors", doctorRoute);

// Route for News
app.use("/news", newsRoute);

// Route for Gallery
app.use("/gallery", galleryRoute);

// Route for Opinions
app.use("/opinions", opinionRoutes);
