import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { client } from "./redis";
import { registerRoutes } from "./controllers";
import { beginProcess } from "./bg_process";

dotenv.config();

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
  })
);

registerRoutes(app);

app.listen(port, async () => {
  try {
    console.log(`Server listening on http://localhost:${port}`);
  
    console.log("Connecting to Redis...");
    await client.connect();
    console.log("Connected to Redis");

    console.log("Starting event processing...");
    beginProcess();
    console.log("Event processing started");
  } catch (error) {
    console.error("Error connecting:", error);
  }
});
