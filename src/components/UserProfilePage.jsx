import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UserProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const {userid}=useParams()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`https://startoon-be.onrender.com/user/${userid}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }); // Assuming this endpoint fetches user details from the backend
        setUserDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {loading ? (
        <p>Loading...</p>
      ) : userDetails ? (
        <div className="profile-details">
          <div>
            <strong>Name:</strong> {userDetails.name}
          </div>
          <div>
            <strong>Email:</strong> {userDetails.email}
          </div>
          <div>
            <strong>Gender:</strong> {userDetails.gender}
          </div>
        </div>
      ) : (
        <p>No user details found</p>
      )}
      <button className='logout-user' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserProfilePage;

