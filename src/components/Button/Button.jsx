import React from 'react';
import './Button.scss'

export default function Button({ text, classBtn, handelClick }) {
  return (
    <button onClick={handelClick} className={`btn_green ${classBtn || ''}`}>
      {text}
    </button>
  );
}
