import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import RouterView from './Router';
import { get } from './services/http-request';
import { setCurrentEmployee } from './store/user';

function App() {
  const dispatch = useDispatch();

  const getMyProfile = async () => {
    const response = await get('me');
    if (response.success) {
      dispatch(setCurrentEmployee(response.data));
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  return <RouterView />;
}

export default App;
