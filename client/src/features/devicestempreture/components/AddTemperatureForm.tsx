import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useAddDeviceTemperature } from "../hooks/useAddDeviceTemperature";

interface AddTemperatureFormProps {
  deviceId: number;
}

export function AddTemperatureForm({ deviceId }: AddTemperatureFormProps) {
  const [open, setOpen] = useState(false);
  const [temperature, setTemperature] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const addTemperature = useAddDeviceTemperature(resetForm);

  function resetForm() {
    setTemperature("");
    setTimestamp("");
    setOpen(false);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!temperature || !timestamp) return;

    addTemperature.mutate({
      deviceId,
      timestamp: timestamp,
      value: parseFloat(temperature),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="gap-2 text-xs sm:text-sm md:text-base bg-primary/10 text-primary"
          size="sm"
          variant="secondary"
        >
          <Plus className="h-4 w-4" />
          Add Reading
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[90%] sm:max-w-md p-6 space-y-4">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">
            Add Temperature Reading
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="temperature" className="text-sm font-medium">
              Temperature (°C)
            </Label>
            <Input
              id="temperature"
              type="number"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              placeholder="e.g., 25.5"
              required
              disabled={addTemperature.isPending}
              className="text-sm sm:text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timestamp" className="text-sm font-medium">
              Timestamp
            </Label>
            <Input
              id="timestamp"
              type="datetime-local"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              required
              disabled={addTemperature.isPending}
              className="text-sm sm:text-base"
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={addTemperature.isPending}
              className="w-full sm:w-auto text-xs sm:text-sm md:text-base"
            >
              {addTemperature.isPending ? "Adding..." : "Add Reading"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
