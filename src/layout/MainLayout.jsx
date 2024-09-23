import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";

export default function Mainlayout() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-white">
        <Navbar />
      </header>
      <main className="flex h-full w-full bg-white">
        <SideBar />

        <div className="h-full w-full bg-slate-100 p-5">
          <div className="h-full w-full bg-white p-5">
            <Outlet />
          </div>
        </div>
      </main>
      <div className="sticky bottom-0 z-10 bg-white text-black">
        <Footer />
      </div>
    </>
  );
}
