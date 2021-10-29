import React from 'react';
import './style.css';
import { Button, Upload } from 'antd';
import galleryIcon from '../../assets/images/gallery.png';

interface FeedUploadProps {
  onNext?: (values: number) => void;
}

export default function FeedUpload({ onNext }: FeedUploadProps) {
  return (
    <div className="feed-upload">
      <h1>Upload Attatchment</h1>
      <div className="feed-upload-action">
        <img src={galleryIcon} alt="" />
        <h2>Upload your attatchment here</h2>
        <Upload>
          <Button type="primary">Upload</Button>
        </Upload>
      </div>
      <div className="feed-modal-footer">
        <Button>Back</Button>
        <Button onClick={() => (onNext ? onNext(1) : null)}>Next</Button>
      </div>
    </div>
  );
}
