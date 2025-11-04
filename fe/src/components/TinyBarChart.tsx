import { Bar, BarChart } from "recharts";
import type { Campaign } from "../types";
import type { FC } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "./ui/chart";

type TinyBarChartProps = {
  campaigns: Campaign;
};

const processCampaigns = (campaigns: Campaign) => {
  const chartData = Object.entries(campaigns).map(([key, value]) => ({
    campaign_id: key,
    count: value
  }));

  const chartConfig = chartData.reduce((config, _dataPoint) => {


    return config;
  }, {} as ChartConfig);

  return { chartData, chartConfig };
}

export const TinyBarChart: FC<TinyBarChartProps> = ({ campaigns }) => {
  const { chartConfig, chartData } = processCampaigns(campaigns);

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart
        accessibilityLayer
        width={400}
        height={300}
        data={chartData}
      >
        <Bar dataKey="count" fill="#8884d8" />
        <ChartTooltip cursor={{
            opacity: 0.3,
          }} content={<ChartTooltipContent labelFormatter={(_, payload) => payload[0].payload.campaign_id} />} />
      </BarChart>
    </ChartContainer>
  );
};