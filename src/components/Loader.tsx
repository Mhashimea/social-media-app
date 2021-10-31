import React from 'react';
import LoaderGif from '../assets/images/loader.gif';

export default function Loader() {
  return (
    <div className="loader-gif w-full">
      <div className="loader-gif-img">
        <img src={LoaderGif} alt="" />
      </div>
      <h1>Loading...</h1>
    </div>
  );
}
