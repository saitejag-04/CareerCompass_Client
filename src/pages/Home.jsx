import React, { useEffect, useRef, useState } from 'react';

import axios from '../api/axios';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import SortBar from '../components/SortBar';
import AddJobForm from '../components/AddJobForm';
import JobCard from '../components/JobCard';
import './Home.css';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    company: '',
    position: '',
    status: 'applied',
    link: '',
    notes: '',
    resume: ''
  });

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [highlightId, setHighlightId] = useState(null);
  const [message, setMessage] = useState('');
  const [resumes, setResumes] = useState([]);

  const addJobRef = useRef(null);


  const fetchJobs = async () => {
    try {
      const res = await axios.get('/jobs');
      setJobs(res.data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error.response?.data?.message || error.message);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/jobs/${editId}`, form);
        setIsEditing(false);
        setEditId(null);
        setHighlightId(null);
      } else {
        await axios.post('/jobs', form);
      }
      setForm({ company: '', position: '', status: 'applied', link: '', notes: '' });
      fetchJobs();
      setMessage(isEditing ? 'Job updated successfully!' : 'Job added successfully!');
      setTimeout(() => setMessage(''), 3000);

    } catch (error) {
      console.error('Failed to submit job:', error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this job?');

  if (!confirmDelete) return;

  try {
    await axios.delete(`/jobs/${id}`);
    fetchJobs();
    setMessage('Job deleted successfully!');
    setTimeout(() => setMessage(''), 3000);
  } catch (error) {
    console.error('Failed to delete job:', error.response?.data?.message || error.message);
  }
};


  const handleEdit = (job) => {
    setForm({
      company: job.company,
      position: job.position,
      status: job.status,
      link: job.link,
      notes: job.notes,
      resume: job.resume || ''
    });
    setIsEditing(true);
    setEditId(job._id);
    setHighlightId(job._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filterAndSortJobs = () => {
    let filtered = [...jobs];

    if (filterStatus !== 'all') {
      filtered = filtered.filter((job) => job.status === filterStatus);
    }

    if (search.trim() !== '') {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.company.toLowerCase().includes(term) ||
          job.position.toLowerCase().includes(term)
      );
    }

    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'company') {
      filtered.sort((a, b) => a.company.localeCompare(b.company));
    }

    return filtered;
  };
  useEffect(() => {
  fetchJobs();
  fetchResumes(); // for dropDown
}, []);

const fetchResumes = async () => {
  try {
    const res = await axios.get('/resumes');
    setResumes(res.data);
  } catch (error) {
    console.error('Failed to fetch resumes:', error);
  }
};

  const displayedJobs = filterAndSortJobs();

  return (
    <div className="home-container">
      <h2>CareerCompass - My Job Applications</h2>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <FilterBar filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
        <SortBar sortBy={sortBy} setSortBy={setSortBy} />
      </div>
       <div ref={addJobRef}>
        <div id="add-job-section">
            <AddJobForm
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isEditing={isEditing}
                resumes = {resumes}
            />
        </div>
            
       </div>
      

       {message && <div className="success-msg">{message}</div>}

        

      <SearchBar search={search} setSearch={setSearch} />
      <div className="job-list">
        {displayedJobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isHighlighted={highlightId === job._id}
          />
        ))}
        

      </div>
    </div>
  );
};

export default Home;
