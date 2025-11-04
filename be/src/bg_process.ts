import { client } from "./redis";

const PROCESS_INTERVAL_MS = 5000;
let interval: NodeJS.Timeout | null = null;

const processEvents = async () => {
  if (interval !== null) {
    return;
  }

  try {
    const events: string[] = await client.lRange("events", 0, 999);

    await Promise.all(
      events.map(event => {
        console.log("Processing event:", event);
        const { campaign_id } = JSON.parse(event);
        
        return client.hIncrBy("campaigns", campaign_id, 1);
      })
    );
    
    await client.lTrim("events", events.length, -1);

  } catch (error) {
    console.error("Error processing events:", error);
  }
};

export const beginProcess = (): { message: string } | undefined => {
  if (interval) return { message: "Process is already running." };

  interval = setInterval(processEvents, PROCESS_INTERVAL_MS);
}

export const stopProcess = () => {
  if (interval) {
    clearInterval(interval);

    interval = null;
  }
}

export const isProcessing = () => interval !== null;