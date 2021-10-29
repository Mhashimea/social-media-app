import { Button, Input } from "antd";
import React from "react";
import {
  NotificationsOutline,
  MailOutline,
  AddCircleOutline,
} from "react-ionicons";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-search">
        <Input placeholder="Search" className="bg-gray-400" />
      </div>
      <div className="navbar-controls">
        <NotificationsOutline cssClasses="navbar-control-icon" />
        <MailOutline cssClasses="navbar-control-icon" />
        <Button type="primary">
          <AddCircleOutline color="#fff" />
          Add A Post
        </Button>
      </div>
    </div>
  );
}
