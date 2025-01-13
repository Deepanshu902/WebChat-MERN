import express  from "express";

import cors from "cors"

import cookieParser from "cookie-parser"

import userRouter from "../src/routes/user.route.js"

import messageRouter from "../src/routes/message.route.js"

import { app,server } from "./utils/socket.js";



app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
})) 

//3 major config of express

app.use(express.json({limit:"16kb"}));

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(express.static("public"))

app.use(cookieParser())



app.use("/api/v1/users", userRouter);

app.use("/api/v1/message",messageRouter)

