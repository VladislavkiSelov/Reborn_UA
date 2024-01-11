import React from 'react';
import { ReactComponent as LeftArrow } from '../../images/arrow_left.svg';
import { ReactComponent as RightArrow } from '../../images/arrow_right.svg';
import { ReactComponent as Close } from '../../images/close_slider.svg';
import './ModalSlider.scss';

export default function ModalSlider({ setModalSlider, activeSlide, nextClick, backClick, arrayPicture }) {
  function closeModal() {
    setModalSlider(false);
  }

  return (
    <div className="modal-slider">
      <div className="modal-slider__wrapper" ></div>
      <Close className='modal-slider__close' onClick={closeModal}/>
      <div className="modal-slider__content">
        <LeftArrow className="left_arrow" onClick={backClick} />
        <img src={arrayPicture[activeSlide]} alt="#" />
        <RightArrow className="right_arrow" onClick={nextClick} />
      </div>
    </div>
  );
}
