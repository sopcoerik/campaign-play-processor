import axios from 'axios'
import { useEffect, useState } from 'react'
import { Header, SimulateEventButton, ToggleProcessingButton, CampaignsList, TinyBarChart } from './components';
import type { Campaign } from './types';
import { io } from 'socket.io-client';

export const socket = io('http://localhost:3000/');

function App() {

  const [campaigns, setCampaigns] = useState<Campaign>({});

  useEffect(() => {
    const fetchCampaigns = async () => {
      const res = await axios.get('http://localhost:3000/campaigns')

      setCampaigns(res.data);
    }

    fetchCampaigns();

    socket.on('campaignsUpdated', () => {
      console.log('Campaigns updated event received');
      fetchCampaigns();
    });

    return () => socket.disconnect() as unknown as void;
  }, [])

  return (
    <main className='max-w-2xl px-4 py-24 mx-auto space-y-16'>
      <Header>
        <SimulateEventButton />
        <ToggleProcessingButton />
      </Header>
      <CampaignsList campaigns={campaigns} />
      <TinyBarChart campaigns={campaigns} />
    </main>
  )
}

export default App
