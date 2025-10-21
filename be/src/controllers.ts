import { Express, Request, Response } from "express";

import { beginProcess, stopProcess } from "./bg_process";
import { client } from "./redis";
import { Campaign, PlayEvent } from "./types";

export const registerRoutes = (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Server is running... Thank you for the opportunity!");
  });

  app.post("/events", (req: Request, res: Response) => {
    const event: PlayEvent = req.body;

    if (!event.campaign_id || !event.screen_id || !event.timestamp) {
      return res.status(400).send({ error: "Invalid event data" });
    }

    try {
      client.rPush("events", JSON.stringify(event));
      
      console.log("Event received: ", event);
      res.status(201).send({ status: "Event received" });
    } catch (error) {
      res.status(500).send({ error: "Failed to receive event" + "\n" + error });
    }
  });

  app.get("/campaigns", async (req: Request, res: Response) => {
    try {
      const campaigns:Campaign = await client.hGetAll("campaigns");

      res.status(201).send(campaigns);
    } catch (error) {
        res.status(500).send({ error: "Failed to retrieve campaigns" + "\n" + error });
      }
    }
  );

  app.get("/stop_processing", (req: Request, res: Response) => {
    try {
      stopProcess();
      console.log("Processing stopped by user");
      res.status(200).send({ status: "Processing stopped" });
    } catch (error) {
      res.status(500).send({ error: "Failed to stop processing events" + "\n" + error });
    }
  });

  app.get("/start_processing", (req: Request, res: Response) => {
    try {
      beginProcess();
      console.log("Processing started by user");
      res.status(200).send({ status: "Beginning process" });
    } catch (error) {
      res.status(500).send({ error: "Failed to start processing events" + "\n" + error });
    }
  });
};