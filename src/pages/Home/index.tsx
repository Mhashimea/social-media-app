import React from 'react';
import Masonry from 'react-masonry-css';
import FeedCard from '../../components/home/FeedCard';
import './style.css';

export default function Home() {
  const feeds = [
    {
      url: 'https://images.pexels.com/photos/9849841/pexels-photo-9849841.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
    },
    {
      url: 'https://images.pexels.com/photos/9714546/pexels-photo-9714546.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      url: 'https://images.pexels.com/photos/2792670/pexels-photo-2792670.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      url: 'https://images.pexels.com/photos/9849841/pexels-photo-9849841.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
    },
    {
      url: 'https://images.pexels.com/photos/9714546/pexels-photo-9714546.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      url: 'https://images.pexels.com/photos/2792670/pexels-photo-2792670.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
  ];
  return (
    <div className="home">
      <div className="home-header">
        <h1>Feed</h1>
        <div className="home-header-filter">
          <span>Latest</span>
          <span>Popular</span>
        </div>
      </div>
      <div className="home-body">
        <Masonry
          breakpointCols={3}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {feeds.map((items) => {
            return <FeedCard url={items.url} />;
          })}
        </Masonry>
      </div>
    </div>
  );
}
