import React from 'react';
import './style.css';
import { HeartOutline, HeartSharp, ChatbubbleOutline } from 'react-ionicons';
import FeedModal from '../feed/feedModal';

interface FeedCardProps {
  url?: string;
}

export default function FeedCard({ url }: FeedCardProps) {
  return (
    <div className="feed-card">
      <div className="feed-card-attatchment">
        <img src={url} alt="" />
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
      <FeedModal />
    </div>
  );
}
