import React from 'react';
import './Dashboard.css'; // Import the CSS file
import { Navbar } from './Navbar';

const Dashboard = () => {

  return (
    <>
      <div className='logo'>
        <h1>Logo</h1>
      </div>
      <div className="dashboard-container">
        <Navbar />
        <main className="main">
          <h1>Welcome Admin Panel</h1>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
