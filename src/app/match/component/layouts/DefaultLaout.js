"use client";

import Header from "@/app/components/Header";
import Sidebar from "../Sidebar";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-black text-gray-300">
        <Sidebar />
        <div className="ml-20 w-full">{children}</div>
      </div>
    </>
  );
};

export default DefaultLayout;
