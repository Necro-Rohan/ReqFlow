import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoute.js';
import testApiRoute from './routes/testApiRoute.js';
import apiHistoryRoute from './routes/apiHistoryRoute.js';
import profileRoute from './routes/profileRoute.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
connectDB();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


app.get("/api", (req, res) => {
  res.status(200).send("Welcome")
})

app.use("/api/auth", authRoute);
app.use("/api/test", testApiRoute);

app.use("/api/history", apiHistoryRoute);
app.use("/api/user", profileRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});

