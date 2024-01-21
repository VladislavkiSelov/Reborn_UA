import React from 'react';
import './Button.scss';

export default function Button({ text, classBtn, handelClick, statusDisabled }) {
  return (
    <button disabled={statusDisabled} onClick={handelClick} className={`btn ${classBtn || ''}`}>
      {text}
    </button>
  );
}
