import { client } from "./redis";

const PROCESS_INTERVAL_MS = 5000;

export const beginProcess = () => {

  console.log("Starting event processing...");

  const interval = setInterval(async () => {
    const events = await client.lRange("events", 0, -1);

    console.log("Processing events:", events);

    client.del("events");

    events.forEach(event => {
      
      const { campaign_id } = JSON.parse(event);
      
      console.log(campaign_id);

      client.hIncrBy("campaigns", campaign_id, 1);
      
      console.log("Processed event:", event);

    });

  }, PROCESS_INTERVAL_MS);

}