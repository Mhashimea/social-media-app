import React from 'react';
import './style.css';
import video from '../../assets/images/video.png';
import image from '../../assets/images/image.png';
import { Button } from 'antd';

interface FeedTypeProps {
  onNext?: (values: number) => void;
}

export default function FeedType({ onNext }: FeedTypeProps) {
  return (
    <div className="feed-type">
      <h1>Select Feed Type</h1>
      <div className="flex items-center justify-center mb-10">
        <div className="feed-type-item feed-type-item-active">
          <img src={image} alt="" />
        </div>
        <div className="feed-type-item">
          <img src={video} alt="" />
        </div>
      </div>

      <div className="feed-modal-footer">
        <Button>Back</Button>
        <Button onClick={() => (onNext ? onNext(0) : null)}>Next</Button>
      </div>
    </div>
  );
}
