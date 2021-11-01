import React, { useEffect, useState } from 'react';
import './style.css';
import { Button, Upload } from 'antd';
import galleryIcon from '../../assets/images/gallery.png';

interface FeedUploadProps {
  onNext?: (values: number) => void;
  onBack?: () => void;
  defaultValue?: any;
  onDoneImage?: (values: any) => void;
  type: string;
}

export default function FeedUpload({
  onNext,
  onBack,
  onDoneImage,
  defaultValue,
  type,
}: FeedUploadProps) {
  const [imgUrl, setImgUrl] = useState<any>('');

  const onChangeAvatar = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e);
    reader.onload = () => {
      if (onDoneImage) {
        onDoneImage(reader.result);
        setImgUrl(reader.result);
      }
    };
  };

  const props = {
    action: '#',
    beforeUpload: onChangeAvatar,
    showUploadList: false,
  };

  useEffect(() => {
    if (defaultValue) setImgUrl(defaultValue);
  }, [defaultValue]);

  return (
    <div className="feed-upload">
      <h1>Upload Attatchment</h1>
      {imgUrl ? (
        <>
          {type === 'image' ? (
            <div className="feed-overview-image">
              <img src={imgUrl} alt="" />
            </div>
          ) : (
            <div className="feed-overview-image">
              <video src={imgUrl} autoPlay className="mb-3" />
            </div>
          )}
        </>
      ) : (
        <div className="feed-upload-action">
          <img src={galleryIcon} alt="" />
          <h2>Upload your attatchment here</h2>
          <Upload {...props}>
            <Button type="primary">Upload</Button>
          </Upload>
        </div>
      )}

      <div className="feed-modal-footer">
        <Button onClick={() => (onBack ? onBack() : null)}>Back</Button>
        <Button onClick={() => (onNext ? onNext(1) : null)}>Next</Button>
      </div>
    </div>
  );
}
