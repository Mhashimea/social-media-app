import React, { useEffect, useState } from 'react';
import Logo from '../../assets/images/sidebar-logo.png';
import * as IonIcon from 'react-ionicons';
import { LogOutOutline } from 'react-ionicons';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { get } from '../../services/http-request';
import _ from 'lodash';
import { setFollowings, setFollowers } from '../../store/connection';

export default function Sidebar() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [followers, setFollower] = useState<any>([]);
  const [followings, setFollowingsList] = useState<any>([]);

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

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuth');
    window.location.href = '/';
  };

  const getFollowers = async () => {
    const response = await get('get-followers');
    if (response.success) {
      setFollower(_.get(response, 'data', []).map((a) => a.followingId));
      dispatch(setFollowings(_.get(response, 'data', [])));
    }
  };

  const getFollowings = async () => {
    const response = await get('get-followings');
    if (response.success) {
      setFollowingsList(_.get(response, 'data', []).map((a) => a.followingId));
      dispatch(setFollowers(_.get(response, 'data', [])));
    }
  };

  useEffect(() => {
    const callFunc = async () => {
      await getFollowings();
      await getFollowers();
    };
    callFunc();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <img src={Logo} alt="" />
      </div>

      <div className="sidebar-profile">
        <div className="sidebar-profile-img">
          <img src={currentUser.avatar} alt="" />
        </div>
        <h1>{currentUser.displayName}</h1>
        <p>{currentUser.email}</p>
      </div>

      <div className="sidebar-statitics">
        <div className="sidebar-statitics-item">
          <h1>55</h1>
          <p>Posts</p>
        </div>
        <div className="sidebar-statitics-item">
          <h1>{followings.length || 0}</h1>
          <p>Followers</p>
        </div>
        <div className="sidebar-statitics-item">
          <h1>{followers.length || 0}</h1>
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

      <div className="sidebar-logout sidebar-menus" onClick={logout}>
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
