import { client } from "./redis";

const PROCESS_INTERVAL_MS = 5000;
let interval: NodeJS.Timeout = -1 as unknown as NodeJS.Timeout;

export const beginProcess = () => {

  interval = setInterval(async () => {
    try {
      const events: string[] = await client.lRange("events", 0, 999);
  
      await Promise.all(
        events.map(event => {
          console.log("Processing event:", event);
          const { campaign_id } = JSON.parse(event);
          
          return client.hIncrBy("campaigns", campaign_id, 1);
        })
      );
      
      await client.lTrim("events", 1000, -1);

    } catch (error) {
      console.error("Error processing events:", error);
    }

  }, PROCESS_INTERVAL_MS);

}

export const stopProcess = () => clearInterval(interval);