import type { Temperature } from "@/api/types";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useAppSelector } from "@/store/hooks";
import { Clock, Thermometer } from "lucide-react";

interface TemperatureListProps {
  temperatures: Temperature[];
  isLoading: boolean;
}

export function TemperatureList({
  temperatures,
  isLoading,
}: TemperatureListProps) {
  const selectedDevice = useAppSelector((state) => state.device.selectedDevice);

  if (isLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Loading temperature data...
      </div>
    );
  }

  if (!temperatures || temperatures.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No temperature readings found for this time range.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-base sm:text-lg font-semibold">
       {temperatures.length} Temperature Readings  For {selectedDevice?.name}
      </h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Timestamp
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-muted-foreground" />
                Temperature (°C)
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {temperatures.map((temp) => (
            <TableRow key={temp.id}>
              <TableCell>{new Date(temp.timestamp).toLocaleString()}</TableCell>
              <TableCell>{temp.value.toFixed(1)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

