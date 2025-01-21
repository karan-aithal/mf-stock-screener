import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { initModels } from "./models";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Add a default route
app.get("/", (req, res) => {
    res.send("Welcome to the API! Use /api/auth for authentication endpoints.");
  });
  
// Routes
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
initModels().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
