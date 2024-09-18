import React from 'react';

const Search = ({ inputValue, onChange, onSearch, onKeyDown }) => (
  <div className="searchingDiv">
    <input
      className="searchItem"
      value={inputValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
    <button className="searchButton" onClick={onSearch}>Search</button>
  </div>
);

export default Search;
