import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://startoon-be.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        alert('Invalid credentials')
        throw new Error('Invalid credentials');
      }
  
      const data = await response.json();
      const token = data.token; // Extract token from response
      localStorage.setItem("token", token); // Save the token in localStorage
  
      if (response.ok && formData.email === 'admin@email.com') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-profile/'+data._id);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>SignIn</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <div className="signup-button-container">
          <button type="submit" className="signin-button">Signin</button>
          <div className="signup-link" onClick={() => navigate('/')}>Signup</div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

