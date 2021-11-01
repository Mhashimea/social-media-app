import { Avatar, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import NoData from '../../components/NoData';
import { get, post } from '../../services/http-request';
import { RootState } from '../../store';
import './style.css';
import _ from 'lodash';

export default function Explore() {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followers, setFollower] = useState<any>([]);
  const user = useSelector((state: RootState) => state.user.currentUser);

  const getUsersList = async () => {
    const response = await get('users');
    if (response.success) setData(response.data || []);
    setLoading(false);
  };

  const getFollowings = async () => {
    const response = await get('get-followers');
    if (response.success) {
      setFollower(_.get(response, 'data', []).map((a) => a.followingId));
    }
  };

  const followAction = async (e) => {
    setButtonLoading(true);
    if (followers.includes(e.uid)) {
      const response = await post('remove-follower', { userId: e.uid });
      if (response.success) getFollowings();
    } else {
      const response = await post('add-follower', { userId: e.uid });
      if (response.success) getFollowings();
    }
    setButtonLoading(false);
  };

  useEffect(() => {
    const callFunc = async () => {
      await getFollowings();
      await getUsersList();
    };
    callFunc();
  }, []);

  return (
    <div className="explore">
      <h1>Explore Friends</h1>
      {data.length === 0 && !loading && <NoData />}
      {loading ? (
        <Loader />
      ) : (
        <div className="explore-users">
          {data
            .filter((a: any) => a.uid !== user.uid)
            .map((user: any) => {
              return (
                <div className="explore-users-item">
                  <div>
                    <Avatar size={50} src={user.avatar}>
                      <span>{user.firstName.slice(0, 1)}</span>
                    </Avatar>
                  </div>
                  <div className="explore-users-item-profile">
                    <h2>
                      {user.firstName} {user.lastName}
                    </h2>
                    <p>{user.displayName}</p>
                  </div>
                  <Button
                    disabled={buttonLoading}
                    loading={buttonLoading}
                    size={'small'}
                    type={followers.includes(user.uid) ? 'default' : 'primary'}
                    onClick={() => followAction(user)}
                  >
                    {followers.includes(user.uid) ? 'Remove' : 'Follow'}
                  </Button>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
