import type { Device } from "@/api/types";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useAppDispatch } from "@/store/hooks";
import { Cpu, Tag, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setSelectedDevice } from "@/store/deviceSlice";

export function DeviceTable({ devices }: { devices: Device[] }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSelectDevice = (device: Device) => {
    dispatch(setSelectedDevice(device));
    navigate(`/device/${device.id}`);
  };
  // TODO: use AG grid react instead
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <div className="flex items-center gap-2 ">
              <Cpu className="h-4 w-4 text-muted-foreground" />
              ID
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              Name
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Created At
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {devices.map((d) => (
          <TableRow
            key={d.id}
            onClick={() => handleSelectDevice(d)}
            className="cursor-pointer"
          >
            <TableCell>{d.id}</TableCell>
            <TableCell>{d.name}</TableCell>
            <TableCell>{new Date(d.createdAt).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
