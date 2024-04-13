import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import UserProfilePage from './components/UserProfilePage';
import AdminDashboardPage from './components/AdminDashboardPage';
import GraphPage from './components/GraphPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"element={<SignupPage />} />
        <Route path="/login"element={<LoginPage />} />
        <Route path="/user-profile/:id"element={<UserProfilePage />} />
        <Route path="/admin-dashboard"element={<AdminDashboardPage />} />
        <Route path="/graph"element={<GraphPage />} />
        {/* Any unknown route gone then this shown.. */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;

