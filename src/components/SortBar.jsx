import React from 'react';

const SortBar = ({ sortBy, setSortBy }) => {
  return (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      style={{
        padding: '0.6rem',
        borderRadius: '6px',
        border: '1px solid #ccc'
      }}
    >
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
      <option value="company">Company A-Z</option>
    </select>
  );
};

export default SortBar;
