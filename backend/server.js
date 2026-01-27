import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoute.js';
import testApiRoute from './routes/testApiRoute.js';
import apiHistoryRoute from './routes/apiHistoryRoute.js';
import profileRoute from './routes/profileRoute.js';
import cors from 'cors';
import path from 'path'; 
import { fileURLToPath } from 'url'; 

dotenv.config();

// Configure paths for ES Modules, ES Modules do not have __dirname or __filename by default, so making them manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
connectDB();

const CLIENT_URL = process.env.CLIENT_URL ?? "http://localhost:5173";
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
);


app.get("/api", (req, res) => {
  res.status(200).send("Welcome")
})

app.use("/api/auth", authRoute);
app.use("/api/test", testApiRoute);

app.use("/api/history", apiHistoryRoute);
app.use("/api/user", profileRoute);


// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Handle React Routing, return all requests to React app
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
// ------------------------

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});

