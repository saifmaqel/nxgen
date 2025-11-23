import { Avatar, AvatarFallback } from "./ui/avatar";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full bg-card min-h-16 px-6 shrink-0 max-w-8xl mx-auto">
      <h1 className="text-2xl font-bold">Devices Dashboard</h1>
      <Avatar className="cursor-pointer hover:opacity-80 transition-opacity ">
        <AvatarFallback className="bg-primary/10 font-semibold text-primary">
          SA
        </AvatarFallback>
      </Avatar>
    </header>
  );
}
