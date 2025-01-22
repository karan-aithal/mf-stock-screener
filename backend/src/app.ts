import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { initModels } from "./models";
import authRoutes from "./routes/authRoutes";

// Import routes
import cryptoRoutes from "./routes/cryptoRoutes";
//import stockRoutes from "./routes/stockRoutes";
//import mutualFundRoutes from "./routes/mutualFundRoutes";


dotenv.config();

const app = express();

// Add a default route
app.get("/", (req, res) => {
    res.send("Welcome to the API! Use /api/auth for authentication endpoints.");
  });
  
// Routes
app.use("/api/auth", authRoutes);


console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use('http://localhost:5000/api/auth/google-login',(req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  res.header('Access-Control-Allow-Origin', '*'); // Replace with the actual origin if needed
  //res.send(data);
  next();
});


// Routes
app.use("/api/crypto", cryptoRoutes);
//app.use("/api/stocks", stockRoutes);
//app.use("/api/mutual-funds", mutualFundRoutes);

// Enable CORS for specific origin
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend origin
    methods: ["GET", "POST", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies and credentials
  })
);



// Start server
const PORT = process.env.PORT || 5000;
initModels().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
