import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//before body parser is used but no need to use now but there is in tee documentation
//tala ko vanako form ko data ko lagi
app.use(
  express.json({
    limit: "16kb",
  })
);

//yo cahi url ko lagi
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //extended help to give teh nested object

app.use(express.static('Public')) //public vanako chai folder ko name
app.use(cookieParser())

import userRouter from './routes/user.routes.js'

// app.use('/users/register') yo pani use hunxa tarw standard cahi talako ho v1 version  j diya ne huna
app.use("/api/v1/users",userRouter)

export { app };
