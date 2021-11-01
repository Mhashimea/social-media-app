import { message, Modal } from 'antd';
import React, { useState } from 'react';
import { CloseOutline } from 'react-ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { get, post } from '../../services/http-request';
import { RootState } from '../../store';
import { setPostModal } from '../../store/app';
import { setFeedsData } from '../../store/connection';
import FeedImageEditor from './feedImageEditor';
import FeedOverview from './feedOverview';
import FeedType from './feedType';
import FeedUpload from './feedUpload';
import './style.css';

export default function FeedModal() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [tabState, setTabState] = useState(0);
  const app = useSelector((state: RootState) => state.app);
  const [model, setModel] = useState<any>({});

  const onCloseModal = () => {
    getFeeds();
    setModel({});
    setTabState(0);
    dispatch(setPostModal(false));
  };

  const getFeeds = async () => {
    const response = await get('feeds');
    if (response.success) dispatch(setFeedsData(response.data || []));
  };

  const onDoneImageUpload = (e) => {
    setModel({
      ...model,
      attatchmentUrl: e,
    });
  };

  const onPostFeed = async () => {
    setLoading(true);
    const response = await post('add-feed', {
      attatchmentUrl: model.attatchmentUrl,
      type: model.type,
    });
    if (response.success) {
      message.success('Feed Posted Successfully');
      onCloseModal();
    } else {
      message.error('Internal Server Error');
    }
    setLoading(false);
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
        <FeedType
          onNext={(e) => setTabState(tabState + 1)}
          onClick={(e) => setModel({ ...model, type: e })}
          defaultValue={model.type}
        />
      ) : tabState === 1 ? (
        <FeedUpload
          onNext={(e) =>
            model.type === 'video'
              ? setTabState(tabState + 2)
              : setTabState(tabState + 1)
          }
          onBack={() => setTabState(tabState - 1)}
          onDoneImage={(e) => onDoneImageUpload(e)}
          defaultValue={model.attatchmentUrl}
          type={model.type}
        />
      ) : tabState === 2 ? (
        <FeedImageEditor
          onNext={() => setTabState(tabState + 1)}
          onBack={() => setTabState(tabState - 1)}
          onDoneEdit={(e) => {
            setModel({ ...model, attatchmentUrl: e });
            setTabState(tabState + 1);
          }}
          defaultValue={model.attatchmentUrl}
        />
      ) : (
        <FeedOverview
          attatchmentUrl={model.attatchmentUrl}
          onBack={() =>
            model.type === 'video'
              ? setTabState(tabState - 2)
              : setTabState(tabState - 1)
          }
          onNext={onPostFeed}
          loading={loading}
          type={model.type}
        />
      )}
    </Modal>
  );
}
