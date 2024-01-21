import React, { useEffect, useRef } from 'react';
import './Button.scss';
import {
  LoadingOutlined,
} from '@ant-design/icons';

export default function Button({ text, classBtn, handelClick, statusDisabled, isLoading }) {

  return (
    <button disabled={statusDisabled} onClick={handelClick} className={`btn ${classBtn || ''}`}>
      {isLoading ? <LoadingOutlined /> : text}
    </button>
  );
}
