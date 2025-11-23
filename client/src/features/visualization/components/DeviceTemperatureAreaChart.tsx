import type { Temperature } from "@/api/types";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface DeviceTemperatureAreaChartProps {
  temperatures: Temperature[];
}

export function DeviceTemperatureAreaChart({
  temperatures,
}: DeviceTemperatureAreaChartProps) {
  const chartData = temperatures.map((temp) => ({
    timestamp: new Date(temp.timestamp).getTime(),
    temperature: temp.value,
    formattedDate: format(new Date(temp.timestamp), "MMM dd, HH:mm"),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              opacity={0.8}
            />
            <XAxis
              type="category"
              dataKey="formattedDate"
              name="Time"
              domain={["auto", "auto"]}
              tickFormatter={(formattedDate) =>
                format(new Date(formattedDate), "MMM dd")
              }
              stroke="#9ca3af"
              fontSize={12}
            />
            <YAxis
              type="number"
              dataKey="temperature"
              name="Temperature"
              unit="°C"
              stroke="#9ca3af"
              fontSize={12}
            />
            <ZAxis type="number" dataKey="size" range={[50, 200]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#10b981",
                border: "1px solid #374151",
                borderRadius: "8px",
              }}
            />
            <Scatter name="Temperature" data={chartData} fill="#10b981" />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
