import React from 'react';
import './GreenBtn.scss'

export default function GreenBtn({ text, classBtn, handelClick }) {
  return (
    <button onClick={handelClick} className={`btn ${classBtn || ''}`}>
      {text}
    </button>
  );
}
