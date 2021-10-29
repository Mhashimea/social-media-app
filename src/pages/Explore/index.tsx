import { Avatar, Button } from 'antd';
import React from 'react';
import './style.css';

export default function Explore() {
  return (
    <div className="explore">
      <h1>Explore Friends</h1>
      <div className="explore-users">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((user) => {
          return (
            <div className="explore-users-item">
              <div>
                <Avatar
                  size={50}
                  src={`https://i.pravatar.cc/150?img=${user}`}
                />
              </div>
              <div className="explore-users-item-profile">
                <h2>John Doe</h2>
                <p>John</p>
              </div>
              <Button size={'small'} type="primary">
                Follow
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
