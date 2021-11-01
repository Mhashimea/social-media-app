import React from 'react';
import NodataImg from '../assets/images/no-data.svg';

export default function NoData() {
  return (
    <div className="no-data w-full">
      <div className="no-data-img">
        <img src={NodataImg} alt="" />
      </div>
      <h1>No Data Found</h1>
    </div>
  );
}
