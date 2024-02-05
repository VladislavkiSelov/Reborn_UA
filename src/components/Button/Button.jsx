import React from 'react';
import './Button.scss';
import { LoadingOutlined } from '@ant-design/icons';

export default function Button({ text, classBtn, handelClick, statusDisabled, isLoading }) {
  return (
    <button disabled={statusDisabled} onClick={handelClick} className={`btn ${classBtn || ''}`}>
      <span className='btn__text'>
        <span className='btn__loading'>
          {isLoading ? <LoadingOutlined /> : ''}
        </span>{text}
      </span>
    </button>
  );
}
