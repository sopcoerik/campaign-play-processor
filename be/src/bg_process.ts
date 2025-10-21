import { client } from "./redis";

import { PlayEvent } from "./types";

export const processEvent = async (event: PlayEvent) => {
  try {
    console.log("Processing event:\n", event);
    const { campaign_id } = event;

    await client.hIncrBy("campaigns", campaign_id, 1);
  } catch (error) {
    console.error("Error processing events:", error);
    throw error;
  }
};