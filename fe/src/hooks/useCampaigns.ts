import axios from "axios";
import { useState, useEffect } from "react";
import type { Campaign } from "../types";

const PROCESS_INTERVAL_MS = 5000;

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign>({});

  useEffect(() => {
    const fetchCampaigns = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/campaigns`)

      setCampaigns(res.data);
    }
    
    fetchCampaigns();

    let interval = -1;

    interval = setInterval(fetchCampaigns, PROCESS_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [])

  return {
    campaigns,
  };
}