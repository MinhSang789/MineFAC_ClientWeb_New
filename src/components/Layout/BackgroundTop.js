import React from 'react';

export default function BackgroundTop({ rounded, height = '228px', small, imgSrc }) {
  let image = rounded ? 'assets/images/bg-header-rounded.png' : 'assets/images/bg-header.png';
  image = small ? imgSrc : image;
  return (
    <div className="w-100 position-absolute overflow-hidden" style={{ top: 0, height }}>
      <img className="w-100" src={image} alt="" />
    </div>
  );
}