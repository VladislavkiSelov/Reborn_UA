import React from 'react';
import './BtnGreen.scss'

export default function BtnGreen({ text, classBtn, handelClick }) {
  return (
    <button onClick={handelClick} className={`btn_green ${classBtn || ''}`}>
      {text}
    </button>
  );
}
