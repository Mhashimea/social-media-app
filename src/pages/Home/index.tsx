import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { useDispatch, useSelector } from 'react-redux';
import FeedCard from '../../components/home/FeedCard';
import Loader from '../../components/Loader';
import NoData from '../../components/NoData';
import { get } from '../../services/http-request';
import { RootState } from '../../store';
import { setFeedsData } from '../../store/connection';
import './style.css';

export default function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const app = useSelector((state: RootState) => state.connection);

  const getFeeds = async () => {
    const response = await get('feeds');
    if (response.success) {
      dispatch(setFeedsData(response.data || []));
    }
    setLoading(false);
  };

  useEffect(() => {
    getFeeds();
  }, []);

  return (
    <div className="home">
      <div className="home-header">
        <h1>Feed</h1>
        <div className="home-header-filter">
          <span>Latest</span>
          <span>Popular</span>
        </div>
      </div>
      {app.feeds.length === 0 && !loading && <NoData />}
      {loading && <Loader />}
      {app.feeds.length > 0 && (
        <div className="home-body">
          <Masonry
            breakpointCols={3}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {app.feeds.map((items: any) => {
              return (
                <FeedCard
                  url={items.attatchmentUrl}
                  type={items.type}
                  firstName={items.firstName}
                  lastName={items.lastName}
                  avatar={items.avatar}
                />
              );
            })}
          </Masonry>
        </div>
      )}
    </div>
  );
}
