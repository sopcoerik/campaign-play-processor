import axios from 'axios'
import { useEffect, useState } from 'react'
import { SimulateEventButton } from './components/SimulateEventButton';
import type { Campaign } from './types';
import { Header } from './components/Header';
import { ToggleProcessingButton } from './components/ToggleProcessingButton';
import { CampaignsList } from './components/CampaignsList';

function App() {

  const [campaigns, setCampaigns] = useState<Campaign>({});
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const res = await axios.get('http://localhost:3000/campaigns')

      setCampaigns(res.data);
    }
    
    let interval = -1;

    if (isSimulating) { 
      interval = setInterval(fetchCampaigns, 5000);
    }

    return () => clearInterval(interval);
  }, [isSimulating])

  return (
    <main className='max-w-2xl px-4 py-24 mx-auto space-y-16'>
      <Header>
        <SimulateEventButton isSimulating={isSimulating} onSimulation={setIsSimulating} />
        <ToggleProcessingButton />
      </Header>
      <CampaignsList campaigns={campaigns} />
    </main>
  )
}

export default App
