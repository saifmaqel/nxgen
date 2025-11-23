import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "lucide-react";

export type DateRange = {
  from: Date;
  to: Date;
  label: string;
};

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

const TIME_RANGES: DateRange[] = [
  {
    from: new Date(Date.now() - 24 * 60 * 60 * 1000),
    to: new Date(),
    label: "Last 24 Hours",
  },
  {
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(),
    label: "Last 7 Days",
  },
  {
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
    label: "Last 30 Days",
  },
];

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const handleValueChange = (label: string) => {
    const selectedRange = TIME_RANGES.find((range) => range.label === label);
    if (selectedRange) {
      onChange(selectedRange);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          {value.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Select Time Range</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={value.label}
          onValueChange={handleValueChange}
        >
          {TIME_RANGES.map((range) => (
            <DropdownMenuRadioItem key={range.label} value={range.label}>
              {range.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
