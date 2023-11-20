import React from 'react';
import './MainBtn.scss'

export default function MainBtn({ text, classBtn, handelClick }) {
  return (
    <button onClick={handelClick} className={`btn ${classBtn || ''}`}>
      {text}
    </button>
  );
}
