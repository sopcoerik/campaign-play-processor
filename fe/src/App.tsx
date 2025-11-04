import { Header, SimulateEventButton, ToggleProcessingButton, CampaignsList, TinyBarChart } from '@/components';
import { useCampaigns } from '@/hooks';

function App() {

  const { campaigns } = useCampaigns();
  
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
