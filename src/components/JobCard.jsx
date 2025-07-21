import React from 'react';

const JobCard = ({ job, onEdit, onDelete, isHighlighted }) => {
  return (
    
    <div className="job-item">
        <div className={`job-card ${isHighlighted ? 'highlight' : ''}`}>

      <strong>{job.position}</strong> @ {job.company}<br />
      <span>Status: {job.status}</span><br />
      <span>
        Link: <a href={job.link} target="_blank" rel="noreferrer">{job.link}</a>
      </span><br />
      <span>Notes: {job.notes}</span><br />


       {job.resume && (
        <a href={job.resume}>View Attached Resume</a>
      )}

      <button onClick={() => onEdit(job)}>Edit</button>
      <button onClick={() => onDelete(job._id)} style={{ marginLeft: '1rem' }}>Delete</button>
      </div>
    </div>
  );
};

export default JobCard;