import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { get } from '../../services/http-request';
import { setCurrentEmployee } from '../../store/user';
import Loader from '../Loader';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './style.css';

interface LayoutProps {
  children?: any;
}

export default function Default({ children }: LayoutProps) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getMyProfile = async () => {
    const response = await get('me');
    if (response.success) {
      dispatch(setCurrentEmployee(response.data));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('isAuth');
      window.location.href = '/';
    }

    setLoading(false);
  };

  useEffect(() => {
    getMyProfile();
  }, []);
  return (
    <div className="default h-full flex items-stretch overflow-hidden">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Sidebar />
          <div className="router-view">
            <Navbar />
            <div className="router-view-body">{children}</div>
          </div>
        </>
      )}
    </div>
  );
}
