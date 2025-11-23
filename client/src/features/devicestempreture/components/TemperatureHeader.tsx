import { CardHeader, CardTitle } from "@/components/ui/card";
import { AddTemperatureForm } from "./AddTemperatureForm";
import { Activity, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface TemperatureHeaderProps {
  deviceId: number;
}

export function TemperatureHeader({ deviceId }: TemperatureHeaderProps) {
  const navigate = useNavigate();

  const handleVisualize = () => {
    navigate(`/device/${deviceId}/visual`);
  };

  return (
    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
      <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base ">
        <Thermometer className="h-5 w-5 text-primary" />
        <CardTitle>Devices Temperature Data</CardTitle>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2  ">
        <AddTemperatureForm deviceId={deviceId} />
        <Button
          onClick={handleVisualize}
          className="gap-2 text-xs sm:text-sm md:text-base text-white border-0 transition-all duration-300 hover:scale-102"
          style={{
            background:
              "linear-gradient(90deg, #ef4444, #f59e0b, #10b981, #3b82f6, #8b5cf6, #ef4444)",
            backgroundSize: "200% 100%",
            backgroundPosition: "0% 0%",
          }}
          size="sm"
        >
          Visualize Data
          <Activity className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
  );
}
