import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import cors from "cors";

// configure env
dotenv.config()

//database config
connectDB()

// rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth", authRoutes)

//rest api 
app.get('/', (req, res) => {
    res.send("<h1>Welcome to exommerce app</h1>");
})

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`Server running on mode ${process.env.DEV_MODE} on port ${PORT}`.bgCyan.white);
})