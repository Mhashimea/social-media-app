import { Button, Input } from 'antd';
import React from 'react';

export default function FeedOverview() {
  return (
    <div className="feed-overview">
      <div className="feed-overview-image">
        <img
          src="https://images.pexels.com/photos/9849841/pexels-photo-9849841.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
          alt=""
        />
      </div>
      <div className="feed-overview-actions">
        <Input.TextArea placeholder="Description" />
      </div>

      <div className="feed-modal-footer">
        <Button>Back</Button>
        <Button type="primary">Post Feed</Button>
      </div>
    </div>
  );
}
