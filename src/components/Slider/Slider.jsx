import React, { useState } from 'react';
import { ReactComponent as LeftArrow } from '../../images/arrow_left.svg';
import { ReactComponent as RightArrow } from '../../images/arrow_right.svg';
import NoImg from 'components/NoImg/NoImg';
import ModalSlider from 'components/ModalSlider/ModalSlider';
import './Slider.scss';

export default function Slider({ arrayPicture }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [modalSlider, setModalSlider] = useState(false);

  if (arrayPicture.length === 0) {
    arrayPicture = [...arrayPicture, NoImg];
  }
  // проверка если картинка в массиве если нет то добавляем NoImg

  function backClick() {
    if (activeSlide <= 0) {
      setActiveSlide(arrayPicture.length - 1);
      return;
    }
    setActiveSlide(activeSlide - 1);
  }

  function nextClick() {
    if (activeSlide >= arrayPicture.length - 1) {
      setActiveSlide(0);
      return;
    }
    setActiveSlide(activeSlide + 1);
  }

  function handelClick(e) {
    setActiveSlide(+e.currentTarget.id);
  }

  function clickMainSlide() {
    setModalSlider(true);
  }

  return (
    <>
      <div className="slider">
        <div className="active_slide">
          <LeftArrow className="left_arrow" onClick={backClick} />
          <img onClick={clickMainSlide} src={arrayPicture[activeSlide]} alt="#" />
          <RightArrow className="right_arrow" onClick={nextClick} />
        </div>
        <div className="container_picture">
          {arrayPicture.map((el, i) => (
            <div onClick={e => handelClick(e)} className="box_picture" id={i} key={i}>
              <img src={el} alt="#" />
            </div>
          ))}
        </div>
      </div>
      {modalSlider && (
        <ModalSlider activeSlide={activeSlide} arrayPicture={arrayPicture} setModalSlider={value => setModalSlider(value)} nextClick={nextClick} backClick={backClick} />
      )}
    </>
  );
}
