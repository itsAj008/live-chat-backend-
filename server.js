// import express from 'express';
// import { createServer } from 'node:http';

const express = require('express');
const http = require('http')
const socketIo = require('socket.io');
const cors = require('cors');
const { disconnect } = require('process');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});


io.on('connection',(socket) => {
    console.log('new client connected')

    socket.on('join_room',(data)=>{
        socket.join(data)
        console.log(`user with id : ${socket.id} joined room: ${data}`)
    })

    socket.on('message', (data) => {
        socket.to(data.roomId).emit('rc_message' , data)
    });

    socket.on('disconnect', () => {
        console.log("client disconnected")
    })
})




server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});