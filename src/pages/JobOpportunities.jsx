import React from 'react';
import './JobOpportunities.css';

const jobSites = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs' },
  { name: 'Indeed', url: 'https://www.indeed.com' },
  { name: 'Internshala', url: 'https://internshala.com' },
  { name: 'Naukri', url: 'https://www.naukri.com' },
  { name: 'HackerRank', url: 'https://www.hackerrank.com/jobs' },
  { name: 'AngelList', url: 'https://angel.co/jobs' },
  { name: 'Monster', url: 'https://www.monster.com' },
  { name: 'Glassdoor', url: 'https://www.glassdoor.com/Job' },
];

const Opportunities = () => {
  return (
    <div className="opportunities-container">
      <h2>Top Job Opportunities</h2>
      <p>Explore popular platforms to discover your next opportunity:</p>
      <div className="job-links-grid">
        {jobSites.map((site) => (
          <a
            key={site.name}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="job-card1"
          >
            {site.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Opportunities;
