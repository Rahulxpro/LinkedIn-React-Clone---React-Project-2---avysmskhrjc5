import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer, Navbar } from "./components";
import { useDarkMode } from "./contexts/DarkModeProvider";

const Layout = () => {
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  const { darkMode } = useDarkMode();

  const handleMenu = () => {
    setMenu((prev) => !prev);
  };

  return (
    <div className="">
      {/* NAVBAR */}
      <nav
        className={`text-center  h-14 flex items-center justify-between bg-[#FFFFFF] sticky top-0 shadow-md ${
          darkMode ? "bg-black text-white shadow-gray-900" : "white"
        }`}
      >
        <Navbar handleMenu={handleMenu} menu={menu} />
      </nav>
      {/* MAIN  */}
      <main
        className={`text-center w-full m-auto min-h-[calc(100vh-3.5rem)] pt-4 ${
          darkMode ? "bg-black" : "white"
        }`}
      >
        {pathname === "/" ? <Home /> : <Outlet />}
      </main>
      {/* Footer */}
      <footer
        className={`text-center w-full bg-[#FFFFFF] ${
          darkMode ? "bg-black" : "white"
        }`}
      >
        <Footer />
      </footer>
      <ToastContainer />
    </div>
  );
};

export default Layout;
