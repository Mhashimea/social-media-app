import React, { useEffect, useState } from 'react';
import './style.css';
import video from '../../assets/images/video.png';
import image from '../../assets/images/image.png';
import { Button } from 'antd';
import classNames from 'classnames';

interface FeedTypeProps {
  onNext?: (values: number) => void;
  onClick: (values: string) => void;
  defaultValue?: string;
}

export default function FeedType({
  onNext,
  onClick,
  defaultValue,
}: FeedTypeProps) {
  const [type, setType] = useState<any>('');

  const onClickItem = (item: string) => {
    setType(item);
    onClick(item);
  };

  useEffect(() => {
    setType(defaultValue);
  }, [defaultValue]);

  return (
    <div className="feed-type">
      <h1>Select Feed Type</h1>
      <div className="flex items-center justify-center mb-10">
        <div
          className={classNames({
            'feed-type-item': true,
            'feed-type-item-active': type === 'image',
          })}
          onClick={() => onClickItem('image')}
        >
          <img src={image} alt="" />
        </div>
        <div
          className={classNames({
            'feed-type-item': true,
            'feed-type-item-active': type === 'video',
          })}
          onClick={() => onClickItem('video')}
        >
          <img src={video} alt="" />
        </div>
      </div>

      <div className="feed-modal-footer">
        <div />
        <Button onClick={() => (onNext ? onNext(0) : null)}>Next</Button>
      </div>
    </div>
  );
}
