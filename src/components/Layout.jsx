import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="mx-auto w-full max-w-240 px-6 py-8 md:px-16">
        <Outlet />
      </main>
    </div>
  );
}