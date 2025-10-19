import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { client } from "./redis";
import { beginProcess } from "./processor";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
  })
);


app.get("/", (req: Request, res: Response) => {
  res.send("Server is running...");
});

let isProcessing = false;

app.post("/events", (req: Request, res: Response) => {
  const event = req.body;

  console.log("Received event:", event);

  client.rPush("events", JSON.stringify(event));

  if (!isProcessing) {
    isProcessing = true;
    beginProcess();
  }

  res.status(201).send({ status: "Event received" });
})

app.get("/campaigns", async (req: Request, res: Response) => {
  const campaigns = await client.hGetAll("campaigns");

  res.status(201).send(campaigns);
});

app.listen(port, async () => {
  console.log(`Server listening on http://localhost:${port}`);

  console.log("Connecting to Redis...");
  await client.connect();
  console.log("Connected to Redis");
});
