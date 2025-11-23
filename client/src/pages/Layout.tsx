import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <Toaster position="top-right" />
      <div className="h-screen w-screen text-foreground flex flex-col">
        <Header/>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
}
