import React, { useState } from 'react';
import { ChatbubbleOutline, HeartOutline } from 'react-ionicons';
import './style.css';
import ReactPlayer from 'react-player';

interface FeedCardProps {
  url?: string;
  type: string;
}

export default function FeedCard({ url, type }: FeedCardProps) {
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
          <img src="https://i.pravatar.cc/150?img=45" alt="" />
          <span>Hashim Ea</span>
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
