import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import './Analysis.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Analysis = () => {
  const [statusCounts, setStatusCounts] = useState(null);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('/jobs');
      const jobs = res.data;

      const counts = {
        applied: 0,
        interview: 0,
        offer: 0,
        rejected: 0,
      };

      jobs.forEach((job) => {
        if (counts[job.status] !== undefined) {
          counts[job.status]++;
        }
      });

      setStatusCounts(counts);
    } catch (error) {
      console.error('Failed to fetch job data:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const data = {
    labels: ['Applied', 'Interview', 'Offer', 'Rejected'],
    datasets: [
      {
        label: 'Number of Jobs',
        data: statusCounts
          ? [
              statusCounts.applied,
              statusCounts.interview,
              statusCounts.offer,
              statusCounts.rejected,
            ]
          : [0, 0, 0, 0],
        backgroundColor: ['#007BFF', '#17A2B8', '#28A745', '#DC3545'],
        borderRadius: 6,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0, // Only integers
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="analysis-page">
      <h2>Job Status Analysis</h2>
      <div className="analysis-chart">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Analysis;
