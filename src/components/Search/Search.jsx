import React from 'react';
import './Search.scss';

function Search() {
  return (
    <div className="searchContainer">
      <label>
        <img src="/img/search.svg" alt="#" />
      <input className="searchField" type="text" placeholder="шукати" />
      </label>
      <label>
      <img src="/img/location.svg" alt="#" />
      <input className="searchSiti" type="text" placeholder="локація" />
      </label>
    </div>
  );
}

export default Search;
