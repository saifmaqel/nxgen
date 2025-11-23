import { useState } from "react";
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
import { useAddDevice } from "../hooks/useAddDevice";
import { Plus } from "lucide-react";

export function AddDeviceDialog() {
  const [open, setOpen] = useState(false);
  const [deviceName, setDeviceName] = useState("");

  const addDevice = useAddDevice(resetForm);

  function resetForm() {
    setDeviceName("");
    setOpen(false);
  }

  const handleSave = () => {
    if (!deviceName.trim()) return;
    addDevice.mutate(deviceName);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button className="gap-2 text-xs sm:text-sm md:text-base" size="sm" variant="primary">
      <Plus className="h-4 w-4" />
      Add Device
    </Button>
  </DialogTrigger>

  <DialogContent className="w-[90%] sm:max-w-md p-6 space-y-4">
    <DialogHeader>
      <DialogTitle className="text-base sm:text-lg">
        Register New Device
      </DialogTitle>
    </DialogHeader>

    <Input
      placeholder="Device name"
      value={deviceName}
      onChange={(e) => setDeviceName(e.target.value)}
      className="text-sm sm:text-base"
    />

    <DialogFooter>
      <Button
        disabled={addDevice.isPending}
        onClick={handleSave}
        className="w-full sm:w-auto text-xs sm:text-sm md:text-base"
      >
        {addDevice.isPending ? "Saving..." : "Save"}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

  );
}
