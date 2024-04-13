import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: ''
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
      const response = await fetch('https://startoon-be.onrender.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Signup successful, navigate to login page
        navigate('/login');
      } else {
        // Signup failed, handle error
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2>SignUp</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <div className="gender">
          Gender :
          <label><input type="radio" name="gender" value="male" onChange={handleChange} required /> Male</label>
          <label><input type="radio" name="gender" value="female" onChange={handleChange} required /> Female</label>
        </div>
        <div className="signup-button-container">
          <button type="submit" className="signup-button">Signup</button>
          <div className="signin-link" onClick={() => navigate('/login')}>Signin</div>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;


