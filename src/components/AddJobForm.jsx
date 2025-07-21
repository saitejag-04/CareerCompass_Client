import React from 'react';

const AddJobForm = ({ form, handleChange, handleSubmit ,isEditing,resumes = []}) => {
  return (
    <form onSubmit={handleSubmit} className="job-form" style={{ marginBottom: '2rem' }}>
      <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
      <input name="position" placeholder="Position" value={form.position} onChange={handleChange} required />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>
      <input name="link" placeholder="Job Link" value={form.link} onChange={handleChange} />
      <input name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />
      <select name="resume" value={form.resume || ''} onChange={handleChange}>
      <option value="">Select Resume (optional)</option>
      {resumes.map((resume, index) => (
        <option key={resume._id} value={resume.url}>
          {`Resume ${index + 1} - ${resume.name}`}
        </option>
      ))}
      </select>

      <button type="submit">
        {isEditing ? 'Update Job' : 'Add Job'}
      </button>

    </form>
  );
};

export default AddJobForm;
