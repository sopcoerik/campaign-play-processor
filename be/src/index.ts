import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { client } from "./redis";
import { registerRoutes } from "./controllers";
import { createServer } from "http";
import { queue } from "./queue";

dotenv.config();

export const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST"]
  }
});
const port = 3000;

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
  })
);

registerRoutes(app);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('workerUpdate', () => {

    io.emit('campaignsUpdated');

    console.log('Worker update received. Broadcasting to all clients.');
  });

  socket.on('stopProcessing', async () => {

    await queue.pause();

    console.log('Processing paused by client request.');
  });

  socket.on('startProcessing', async () => {

    await queue.resume();

    console.log('Processing started by client request.');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, async () => {
  try {
    console.log(`Server listening on http://localhost:${port}`);
  
    console.log("Connecting to Redis...");
    await client.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Error connecting:", error);
  }
});
