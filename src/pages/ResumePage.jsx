import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import ResumeUpload from '../components/ResumeUpload';
import './ResumePage.css';

const ResumePage = () => {
  const [resumes, setResumes] = useState([]);

  const fetchResumes = async () => {
    try {
      const res = await axios.get('/resumes');
      setResumes(res.data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleUploadSuccess = (newResume) => {
    setResumes((prev) => [newResume, ...prev]);
  };
  const handleDelete = async (id) => {
  if (!window.confirm('Are you sure you want to delete this resume?')) return;
  try {
    await axios.delete(`/resumes/${id}`);
    setResumes(prev => prev.filter(resume => resume._id !== id));
  } catch (err) {
    alert('Failed to delete resume');
    console.error(err);
  }
};


  return (
    <div className="resume-page-container">
      <h2>Resume Manager</h2>

      <ResumeUpload onUploadSuccess={handleUploadSuccess} />

      <div className="resume-list">
        {resumes.length === 0 ? (
          <p>No resumes uploaded yet.</p>
        ) : (
          resumes.map((resume) => (
            <div key={resume._id || resume.url} className="resume-card">
              {/* <p><strong>{resume.name}</strong></p> */}
              <p><strong>{resume.label || resume.name}</strong></p>

              <a 
                href={resume.url}
                target="_blank" 
                rel="noopener noreferrer"
              >
              

                View Resume
              </a>
              <button onClick={() => handleDelete(resume._id)}>Delete</button>


            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ResumePage;
