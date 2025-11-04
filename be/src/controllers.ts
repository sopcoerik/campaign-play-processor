import { Express, Request, Response } from "express";
import { client } from "./redis";
import { Campaign, PlayEvent } from "./types";
import { isProcessing, stopProcess, beginProcess } from "./bg_process";

export const registerRoutes = (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Server is running... Thank you for the opportunity!");
  });

  app.post("/events", async (req: Request, res: Response) => {
    const event: PlayEvent = req.body;

    if (!event.campaign_id || !event.screen_id || !event.timestamp) {
      return res.status(400).send({ error: "Invalid event data" });
    }

    try {
      await client.rPush("events", JSON.stringify(event));
      
      console.log("Event received: ", event);
      res.status(201).send({ status: "Event received" });
    } catch (error) {
      res.status(500).send({ error: "Failed to receive event" + "\n" + error });
    }
  });

  app.get("/campaigns", async (req: Request, res: Response) => {
    try {
      const campaigns:Campaign = await client.hGetAll("campaigns");

      res.status(200).send(campaigns);
    } catch (error) {
        res.status(500).send({ error: "Failed to retrieve campaigns" + "\n" + error });
      }
    }
  );

  app.get("/process_state", (req: Request, res: Response) => {
    try {
      if (isProcessing()) {
        res.status(200).send({ state: "running" });
      } else {
        res.status(200).send({ state: "stopped" });
      }
    } catch (error) {
      res.status(500).send({ error: "Failed to get process state" + "\n" + error });
    }
  });

  app.post("/stop_processing", (req: Request, res: Response) => {
    try {
      stopProcess();
      console.log("Processing stopped by user");
      res.status(200).send({ status: "Processing stopped" });
    } catch (error) {
      res.status(500).send({ error: "Failed to stop processing events" + "\n" + error });
    }
  });

  app.post("/start_processing", (req: Request, res: Response) => {
    try {
      const error = beginProcess();
      if (error?.message) {
        return res.status(400).send(error.message);
      } else {
        console.log("Processing started by user");
        res.status(200).send({ status: "Beginning process" });
      }
    } catch (error) {
      res.status(500).send({ error: "Failed to start processing events" + "\n" + error });
    }
  });
};