import { Modal } from 'antd';
import React, { useState } from 'react';
import { CloseOutline } from 'react-ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setPostModal } from '../../store/app';
import FeedImageEditor from './feedImageEditor';
import FeedOverview from './feedOverview';
import FeedType from './feedType';
import FeedUpload from './feedUpload';
import './style.css';

export default function FeedModal() {
  const dispatch = useDispatch();
  const [tabState, setTabState] = useState(0);
  const app = useSelector((state: RootState) => state.app);

  const onCloseModal = () => {
    dispatch(setPostModal(true));
  };
  return (
    <Modal
      visible={app.addPostModal}
      title={null}
      footer={null}
      className="feed-modal"
      width={500}
    >
      <div className="feed-modal-close" onClick={onCloseModal}>
        <CloseOutline />
      </div>
      {tabState === 0 ? (
        <FeedType onNext={(e) => setTabState(e + 1)} />
      ) : tabState === 1 ? (
        <FeedUpload onNext={(e) => setTabState(e + 1)} />
      ) : tabState === 2 ? (
        <FeedImageEditor />
      ) : (
        <FeedOverview />
      )}
    </Modal>
  );
}
