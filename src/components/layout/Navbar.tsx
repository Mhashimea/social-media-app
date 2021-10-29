import { Button, Input } from 'antd';
import React from 'react';
import {
  AddCircleOutline,
  MailOutline,
  NotificationsOutline,
} from 'react-ionicons';
import { useDispatch } from 'react-redux';
import { setPostModal } from '../../store/app';

export default function Navbar() {
  const dispatch = useDispatch();
  const showPostModal = () => {
    dispatch(setPostModal(true));
  };
  return (
    <div className="navbar">
      <div className="navbar-search">
        <Input placeholder="Search" className="bg-gray-400" />
      </div>
      <div className="navbar-controls">
        <NotificationsOutline cssClasses="navbar-control-icon" />
        <MailOutline cssClasses="navbar-control-icon" />
        <Button type="primary" onClick={showPostModal}>
          <AddCircleOutline color="#fff" />
          Add A Post
        </Button>
      </div>
    </div>
  );
}
