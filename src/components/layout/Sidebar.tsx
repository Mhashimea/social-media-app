import React from 'react';
import Logo from '../../assets/images/sidebar-logo.png';
import * as IonIcon from 'react-ionicons';
import { LogOutOutline } from 'react-ionicons';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export default function Sidebar() {
  const menus = [
    {
      name: 'Feed',
      icon: 'GridOutline',
      url: '/home',
    },
    {
      name: 'Explore',
      icon: 'SearchOutline',
      url: '/explore',
    },
    {
      name: 'Profile',
      icon: 'PersonOutline',
      url: '/my-profile',
    },
    {
      name: 'Settings',
      icon: 'CogOutline',
      url: '/settings',
    },
  ];
  const pathName = window.location.pathname;
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <img src={Logo} alt="" />
      </div>

      <div className="sidebar-profile">
        <div className="sidebar-profile-img">
          <img src="https://i.pravatar.cc/150?img=8" alt="" />
        </div>
        <h1>John Doe</h1>
        <p>johndoe@yopmail.com</p>
      </div>

      <div className="sidebar-statitics">
        <div className="sidebar-statitics-item">
          <h1>55</h1>
          <p>Posts</p>
        </div>
        <div className="sidebar-statitics-item">
          <h1>26</h1>
          <p>Followers</p>
        </div>
        <div className="sidebar-statitics-item">
          <h1>14</h1>
          <p>Following</p>
        </div>
      </div>

      <div className="sidebar-menus">
        {menus.map((menu, index) => {
          const icon = React.createElement(IonIcon[menu.icon]);
          return (
            <Link
              className={classNames({
                'sidebar-menus-item': true,
                'router-active': pathName === menu.url,
              })}
              to={menu.url}
              key={index}
            >
              <div className="sidebar-menus-item-icon">{icon}</div>
              <div className="sidebar-meus-item-name">{menu.name}</div>
            </Link>
          );
        })}
      </div>

      <div className="sidebar-logout sidebar-menus">
        <div className="sidebar-menus-item">
          <div className="sidebar-menus-item-icon">
            <LogOutOutline />
          </div>
          <div className="sidebar-meus-item-name">Logout</div>
        </div>
      </div>
    </div>
  );
}
