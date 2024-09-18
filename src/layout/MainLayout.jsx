import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Mainlayout() {
  return (
    <>
      <header className="sticky top-0 z-10">
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <div className="sticky bottom-0 z-10 bg-slate-100">
        <Footer />
      </div>
    </>
  );
}
