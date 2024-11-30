// src/components/Sidebar.js
import React from "react";
import Image from "next/image";
import { RxDashboard } from "react-icons/rx";
import { IoLogoWebComponent } from "react-icons/io5";
import { IoStatsChartOutline } from "react-icons/io5";
import { IoIosGitBranch } from "react-icons/io";
import { FiDatabase } from "react-icons/fi";
import { FaRegCircle } from "react-icons/fa6";
import Logo from "../../assets/Logo.png";

const Sidebar = () => {
  return (
    <div className="h-screen w-20 border-r border-gray-800 bg-black text-gray-300 fixed top-0 left-0 flex flex-col items-center justify-start">
      <Image
        src={Logo}
        alt="Logo"
        className="mt-4"
        style={{ width: "32px", height: "32px" }}
      />

      <div className="mt-10 hover:bg-gradient-to-t from-black to-gray-900 h-10 w-10 hover:border border-gray-800 flex items-center justify-center rounded-lg">
        <FaRegCircle />
      </div>
      <div className="mt-2 hover:bg-gradient-to-t from-black to-gray-900 h-10 w-10 hover:border border-gray-800 flex items-center justify-center rounded-lg">
        <RxDashboard />
      </div>
      <div className="mt-2 hover:bg-gradient-to-t from-black to-gray-900 h-10 w-10 hover:border border-gray-800 flex items-center justify-center rounded-lg">
        <IoStatsChartOutline />
      </div>
      <div className="mt-2 hover:bg-gradient-to-t from-black to-gray-900 h-10 w-10 hover:border border-gray-800 flex items-center justify-center rounded-lg">
        <IoIosGitBranch />
      </div>
      <div className="mt-2 hover:bg-gradient-to-t from-black to-gray-900 h-10 w-10 hover:border border-gray-800 flex items-center justify-center rounded-lg">
        <FiDatabase />
      </div>
    </div>
  );
};

export default Sidebar;
