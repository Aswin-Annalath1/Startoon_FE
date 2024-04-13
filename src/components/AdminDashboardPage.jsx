import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboardPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchUserDetails(token);
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      const response = await fetch("https://startoon-be.onrender.com/users", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  return (
    <div className="admin-dashboard-container">
      <nav>
        <ul>
          <li><Link to="/graph">Graph</Link></li>
          <li ><Link className='logout' to="/" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>
      <h2>User Details</h2>
      <table>
        <thead>
          <tr>
            <th>SlNo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Count</th>
            <th>Last Login Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.count}</td>
              <td>{new Date(user.lastLoginDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboardPage;

