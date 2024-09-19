import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Component/Login';
import Signup from './Component/Signup';
import Dashboard from './Component/Dashboard'; // Corrected spelling
import EmployeeComponent from './Component/EmployeeComponent';
import EmployeeList from './Component/EmployeeList';
import UpdateEmployee from './Component/UpdateEmployee';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Dashboard" element={<Dashboard />} /> {/* Use lowercase path */}
          <Route path="/EmployeeComponent" element={<EmployeeComponent />} /> {/* Use lowercase path */}
          <Route path="/employeelist" element={<EmployeeList />} /> {/* Use lowercase path */}
          <Route path="/edit-employee/:id" element={<UpdateEmployee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
