import React from 'react'
import './BtnGraphite.scss'

export default function BtnGraphite({ text, classBtn, handelClick }) {
    return (
      <button onClick={handelClick} className={`btn_graphite ${classBtn || ''}`}>
        {text}
      </button>
    );
  }
  