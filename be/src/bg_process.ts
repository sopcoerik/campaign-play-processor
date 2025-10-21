import { client } from "./redis";

const PROCESS_INTERVAL_MS = 5000;
let interval: NodeJS.Timeout = -1 as unknown as NodeJS.Timeout;

export const beginProcess = () => {

  interval = setInterval(async () => {
    try {
      const events: string[] = await client.lRange("events", 0, -1);
  
      events.forEach(event => {
        console.log("Processing event:", event);
        const { campaign_id } = JSON.parse(event);
        
        client.hIncrBy("campaigns", campaign_id, 1);
      });
      
      client.del("events");

    } catch (error) {
      console.error("Error processing events:", error);
      throw error;
    }

  }, PROCESS_INTERVAL_MS);

}

export const stopProcess = () => clearInterval(interval);