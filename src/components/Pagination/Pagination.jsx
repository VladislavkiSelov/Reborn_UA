import React, { useEffect, useState } from 'react';
import { ReactComponent as BtnLeft } from '../../images/left_parenthesis.svg';
import { ReactComponent as BtnRight } from '../../images/right_parenthesis.svg';
import './Pagination.scss';

export default function Pagination({ maxElementPage, setPage }) {
  const [max, setMax] = useState(0);
  const [valueInput, setValueInput] = useState(1);

  function handelChange(e) {
    if (e.target.value > max) {
      setValueInput(max);
      return;
    }

    if (/^[0]{1}/.test(e.target.value)) {
      e.preventDefault();
      return;
    }

    if (/[^0-9]/.test(e.target.value)) {
      e.preventDefault();
      return;
    }

    setValueInput(e.target.value);
  }

  function nextPage() {
    if (valueInput === max) {
      return;
    }
    setValueInput(valueInput + 1);
  }

  function prevPage() {
    if (valueInput === 1) {
      return;
    }
    setValueInput(valueInput - 1);
  }

  useEffect(() => {
    setMax(Math.ceil(maxElementPage / 6));
  }, [maxElementPage]);

  useEffect(() => {
    if (valueInput === '') {
      return;
    }
    setPage(valueInput - 1);
  }, [valueInput, setPage]);

  return (
    <div className="pagination">
      <button className="btn_left_pagination">
        <BtnLeft onClick={prevPage} />
      </button>
      <div className="pagination_value_box">
        <input type="text" onChange={e => handelChange(e)} value={valueInput} />
        <span> - </span>
        <h5>{max}</h5>
      </div>
      <button className="btn_right_pagination">
        <BtnRight onClick={nextPage} />
      </button>
    </div>
  );
}
