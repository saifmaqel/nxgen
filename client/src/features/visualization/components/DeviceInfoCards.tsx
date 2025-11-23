import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Temperature } from "@/api/types";
import { Thermometer, Sigma, ListChevronsDownUp, Notebook } from "lucide-react";

interface DeviceInfoCardsProps {
  temperatures: Temperature[];
}

export function DeviceInfoCards({ temperatures }: DeviceInfoCardsProps) {
  const values = temperatures.map((t) => t.value);
  const lastReading = temperatures[temperatures.length - 1]?.value || 0;
  const average = values.reduce((a, b) => a + b, 0) / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const total = temperatures.length;

  const cardsInfos = [
    {
      title: "Last Reading",
      value: `${lastReading.toFixed(1)}°C`,
      icon: Notebook,
      color: "text-blue-500",
    },
    {
      title: "Average",
      value: `${average.toFixed(1)}°C`,
      icon: ListChevronsDownUp,
      color: "text-green-500",
    },
    {
      title: "Min / Max",
      value: `${min.toFixed(1)}° / ${max.toFixed(1)}°`,
      icon: Thermometer,
      color: "text-orange-500",
    },
    {
      title: "Total Readings",
      value: total.toString(),
      icon: Sigma,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardsInfos.map((cardInfo) => {
        const Icon = cardInfo.icon;
        return (
          <Card key={cardInfo.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {cardInfo.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${cardInfo.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cardInfo.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
