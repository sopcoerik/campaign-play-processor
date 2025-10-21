import axios from "axios";
import { useState, type FC } from "react";
import type { PlayEvent } from "../types";

const screenIds: string[] = [
  "screen-101",
  "screen-102",
  "screen-103",
  "screen-104",
  "screen-105",
  "screen-106",
  "screen-107",
  "screen-108",
  "screen-109",
  "screen-110",
  "screen-111",
  "screen-112",
  "screen-113",
  "screen-114",
  "screen-115",
  "screen-116",
  "screen-117",
  "screen-118",
  "screen-119",
  "screen-120",
  "screen-121",
  "screen-122",
  "screen-123",
  "screen-124",
  "screen-125"
];

const campaignIds:string[] = [
  "cmp-2025-001",
  "cmp-2025-002",
  "cmp-2025-003",
  "cmp-2025-004",
  "cmp-2025-005",
  "cmp-2025-006",
  "cmp-2025-007",
  "cmp-2025-008",
  "cmp-2025-009",
  "cmp-2025-010",
  "cmp-2025-011",
  "cmp-2025-012",
  "cmp-2025-013",
  "cmp-2025-014",
  "cmp-2025-015",
  "cmp-2025-016",
  "cmp-2025-017",
  "cmp-2025-018",
  "cmp-2025-019",
  "cmp-2025-020",
  "cmp-2025-021",
  "cmp-2025-022",
  "cmp-2025-023",
  "cmp-2025-024",
  "cmp-2025-025"
];

const getRandomEvent = () => {
  const screen_id = screenIds[Math.floor(Math.random() * screenIds.length)];
  const campaign_id = campaignIds[Math.floor(Math.random() * campaignIds.length)];
  const timestamp = new Date().toISOString();

  return { screen_id, campaign_id, timestamp } as PlayEvent;
}

type SimulateEventButtonProps = {
  isSimulating?: boolean;
  onSimulation?: (isSimulating: boolean) => void;
}

export const SimulateEventButton: FC<SimulateEventButtonProps> = () => {

  const [isClicked, setIsClicked] =  useState(false);

  const handleClick = async () => {
    setIsClicked(true);

    await axios.post('http://localhost:3000/api/play', getRandomEvent());

    setIsClicked(false);
  }

  return <button className='
    text-emerald-600 px-2 hover:opacity-80 cursor-pointer 
    disbled:opacity-50 disabled:cursor-not-allowed
  ' disabled={isClicked} onClick={handleClick}>{isClicked ? 'Simulating...' : 'Simulate Event'}</button>
}