import React from "react";


const FilterBar = ({ filterStatus, setFilterStatus }) => {
  return (
    <select
      value={filterStatus}
      onChange={(e) => setFilterStatus(e.target.value)}
      style={{
        padding: '0.6rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
        marginRight: '1rem'
      }}
    >
      <option value="all">All</option>
      <option value="applied">Applied</option>
      <option value="interview">Interview</option>
      <option value="offer">Offer</option>
      <option value="rejected">Rejected</option>
    </select>
  );
};

export default FilterBar;