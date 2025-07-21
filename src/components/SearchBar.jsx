import React from 'react';

const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by company or position"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        padding: '0.6rem',
        width: '100%',
        borderRadius: '6px',
        border: '1px solid #ccc',
        marginBottom: '1rem'
      }}
    />
  );
};

export default SearchBar;