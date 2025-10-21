import { Express, Request, Response } from "express";

import { client } from "./redis";
import { Campaign, PlayEvent } from "./types";
import { queue } from "./queue";

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
      await queue.add('event', event);
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
};