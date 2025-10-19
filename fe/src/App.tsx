import axios from 'axios'
import { useEffect, useState } from 'react'
import { SimulateEventButton } from './components/SimulateEventButton';
import type { Campaign } from './types/Campaign';

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
    <main>
      <SimulateEventButton isSimulating={isSimulating} onSimulation={setIsSimulating} />
      {
        Object.entries(campaigns).map(([key, value]) => (
          <div key={key}>
            <p>{key}</p>
            <p>{value}</p>
          </div>
        ))
      }
    </main>
  )
}

export default App
