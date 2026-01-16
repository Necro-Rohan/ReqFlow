import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoute.js';

dotenv.config();


const app = express();
connectDB();
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send("Welcome")
})

app.use("/api/auth", authRoute);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});

