import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./style.css";

interface LayoutProps {
  children?: any;
}

export default function Default({ children }: LayoutProps) {
  return (
    <div className="default h-full flex items-start overflow-hidden">
      <Sidebar />
      <div className="router-view">
        <Navbar />
        <div className="router-view-body">{children}</div>
      </div>
    </div>
  );
}
