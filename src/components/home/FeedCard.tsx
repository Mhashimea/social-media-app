import React from 'react';
import { ChatbubbleOutline, HeartOutline } from 'react-ionicons';
import ReactPlayer from 'react-player';
import './style.css';

interface FeedCardProps {
  url?: string;
  type: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

export default function FeedCard({
  url,
  type,
  firstName,
  lastName,
  avatar,
}: FeedCardProps) {
  return (
    <div className="feed-card">
      <div className="feed-card-attatchment">
        {type === 'image' ? (
          <img src={url} alt="" />
        ) : (
          <ReactPlayer url={url} width={'100%'} height={'100%'} playing muted />
        )}
      </div>
      <div className="feed-card-controls">
        <div className="feed-card-profile">
          <img src={avatar} alt="" />
          <span>{firstName}</span>
          <span>{lastName}</span>
        </div>
        <div className="feed-card-actions">
          <div className="feed-card-action-item mr-5">
            <HeartOutline color="black" />
            <span>5.1K</span>
          </div>
          <div className="feed-card-action-item">
            <ChatbubbleOutline color="black" />
            <span>100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
