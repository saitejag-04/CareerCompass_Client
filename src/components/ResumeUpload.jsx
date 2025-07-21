import React, { useState } from 'react';
import axios from '../api/axios'; 
import './ResumeUpload.css';

const ResumeUpload = ({ onUploadSuccess = () => {} }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file); // 'resume' must match multer.single('resume')
    setUploading(true);

    try {
      // const res = await axios.post('/upload-resume', formData);
      const res = await axios.post('/resumes/upload-resume', formData);

      alert('Resume uploaded successfully!');
      setMessage(`Uploaded: ${res.data.name}`);
      setFile(null);
      if (onUploadSuccess) onUploadSuccess(res.data);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="resume-upload-container">
      <h3>Upload Resume (PDF only)</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleUpload(); }}>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {message && <p className="status-message">{message}</p>}
    </div>
  );
};

export default ResumeUpload;
