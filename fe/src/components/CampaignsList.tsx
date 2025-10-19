import type { FC } from "react";

export type CampaignsListProps = {
  campaigns: Record<string, number>;
}

export const CampaignsList:FC<CampaignsListProps> = ({ campaigns }) => {

  const renderCampaigns = () => {
    return Object.entries(campaigns).map(([key, value]) => (
      <div key={key} className="flex justify-between items-center gap-4 border-b py-2">
        <p>{key}</p>
        <p>{value}</p>
      </div>
    ))
  }

  return (
    <div className="max-h-96 overflow-y-scroll">
      {renderCampaigns()}
    </div>
  )
}