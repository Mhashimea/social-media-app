import { Button, Input } from 'antd';
import React from 'react';

interface FeedOverviewInterface {
  onNext?: () => void;
  onBack: () => void;
  attatchmentUrl?: string;
  loading?: boolean;
  type: string;
}

export default function FeedOverview({
  onNext,
  onBack,
  attatchmentUrl,
  loading,
  type,
}: FeedOverviewInterface) {
  return (
    <div className="feed-overview">
      <div className="feed-overview-image">
        {type === 'image' ? (
          <img src={attatchmentUrl} alt="" />
        ) : (
          <video src={attatchmentUrl} autoPlay className="mb-3" />
        )}
      </div>
      <div className="feed-modal-footer">
        <Button onClick={onBack}>Back</Button>
        <Button
          type="primary"
          onClick={onNext}
          loading={loading}
          disabled={loading}
        >
          Post Feed
        </Button>
      </div>
    </div>
  );
}
