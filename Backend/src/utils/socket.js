import {Server} from "socket.io"

import http from "http"

import express from "express"

// we just build a socket io server on top of express server 

const app = express()
const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin: process.env.CORS_ORIGIN
    }
})

io.on("connection",(socket)=>{
    console.log("User is connected");
    

    socket.on("disconnect",()=>{
        console.log("User Disconnected");
        
    })
})

export {io,app,server}