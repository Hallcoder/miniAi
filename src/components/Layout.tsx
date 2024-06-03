// src/components/Layout.js
import React from "react";
import SideBarNavigation from "./SideBarNavigation";
import { Roboto } from 'next/font/google';
import "../css/custom.css";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin']
});

const Layout = ({ children }) => {
  return (
    <div className={`${roboto.className} flex bg-gray-100`}>
      <div className="flex flex-col w-64 bg-white border-r scrollbar">
        <div className="p-4">
          <SideBarNavigation />
        </div>
      </div>
      <div className="flex flex-col flex-1 h-full">{children}</div>
    </div>
  );
};

export default Layout;
