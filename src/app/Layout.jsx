import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen max-w-[1440px] mx-auto">
      <Navbar />
      <main className="flex-1 overflow-auto">
        <img src="/gradient.png" className='absolute top-0 left-0 w-full h-full z-[-1]' alt="" />
        <Outlet />
      </main>
    </div>
  );
}
