import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function GitHubStats() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/github')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to load data: ' + error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!data) return <div className="no-data">No data available</div>;

  const commitsData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Commits',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Commits'
      }
    }
  };

  return (
    <div className="dashboard fade-in">
      <div className="card">
        <div className="card-header">Estadisticas de usuario</div>
        <div className="card-body">
          <div className="stat">
            <span className="stat-label">Usuario:</span>
            <span className="stat-value">{data.login}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Public Repos:</span>
            <span className="stat-value">{data.public_repos}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Followers:</span>
            <span className="stat-value">{data.followers}</span>
          </div>
        </div>
      </div>
      <div className="chart-container">
        <h2>Commit Activity</h2>
        <Bar data={commitsData} options={options} />
      </div>
    </div>
  );
}

export default GitHubStats;