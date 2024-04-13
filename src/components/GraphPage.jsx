import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJs, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJs.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const GraphPage = () => {
  const navigate = useNavigate();
  const [userCountData, setUserCountData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchUserCountData(token);
  }, []);

  const fetchUserCountData = async (token) => {
    try {
      const response = await fetch("https://startoon-be.onrender.com/user-count", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user count data');
      }

      const data = await response.json();

      // Process the data to prepare for chart
      const dates = Object.keys(data);
      const counts = Object.values(data);

      setUserCountData({
        labels: dates,
        datasets: [
          {
            label: 'User Count',
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75,192,192,0.4)',
            hoverBorderColor: 'rgba(75,192,192,1)',
            data: counts
          }
        ]
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  return (
    <div className='graph-container'>
        <div className='graph-bar'>
        <button onClick={() => navigate(-1)} style={{ marginRight: '1000px', backgroundColor:'green' }}>Go Back</button>
        <button onClick={handleLogout} style={{ marginLeft: 'auto', backgroundColor:'red' }}>Logout</button></div>
    <div className="graph-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <h2>User Count Graph</h2>
      <div className="chart-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50vw', height: '50vh' }}>
        {userCountData.labels && userCountData.labels.length > 0 ? (
          <Bar
            data={userCountData}
            options={{
              scales: {
                y: {
                  type: 'linear',
                  ticks: {
                    beginAtZero: true
                  }
                }
              }
            }}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default GraphPage;



