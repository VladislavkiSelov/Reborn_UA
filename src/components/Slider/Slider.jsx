import React, { useState } from 'react';
import { ReactComponent as LeftArrow } from '../../images/arrow_left.svg';
import { ReactComponent as RightArrow } from '../../images/arrow_right.svg';
import './Slider.scss';

export default function Slider({
  arrayPicture = [
    '/img/img_furniture.png',
    '/img/dog.png',
    '/img/img_furniture.png',
    '/img/Frame_162.png',
  ],
}) {
  const [activeSlide, setActiveSlide] = useState(0);

  function backClick() {
    if (activeSlide <= 0) {
      setActiveSlide(arrayPicture.length - 1);
      return;
    }
    setActiveSlide(activeSlide - 1);
  }

  function nextClick() {
    console.log(activeSlide);
    if (activeSlide >= arrayPicture.length - 1) {
      setActiveSlide(0);
      return;
    }
    setActiveSlide(activeSlide + 1);
  }

  function handelClick(e) {
    setActiveSlide(+e.currentTarget.id);
  }

  return (
    <div className="slider">
      <div className="active_slide">
        <LeftArrow className="left_arrow" onClick={backClick} />
        <img src={arrayPicture[activeSlide]} alt="#" />
        <RightArrow className="right_arrow" onClick={nextClick} />
      </div>
      <div className="container_picture">
        {arrayPicture.map((el, i) => (
          <div
            onClick={e => handelClick(e)}
            className="box_img"
            id={i}
            key={el.img}
          >
            <img src={el} alt="#" />
          </div>
        ))}
      </div>
    </div>
  );
}
