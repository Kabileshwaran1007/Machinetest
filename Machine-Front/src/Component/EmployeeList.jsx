import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EmployeeList.css';
import { Navbar } from './Navbar';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8080/api/employees')
            .then(response => {
                console.log('Response Data:', response.data);
                setEmployees(response.data.employees || []);
            })
            .catch(err => {
                setError("Error fetching employee data");
                console.error(err);
            });
    }, []);
    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/deleteemployees/${id}`);
            // Update the employee list to exclude the deleted employee
            setEmployees(prevEmployees => prevEmployees.filter(employee => employee._id !== id));
        } catch (error) {
            console.error('Error deleting employee:', error);
            setError("Error deleting employee");
        }
    };
    
    return (
        <>
            <Navbar />
            <div className="employee-list-container">
                <h2>Employee List</h2>
                {error && <div className="error-message">{error}</div>}
                <table className="employee-list-table">
                    <thead>
                        <tr>
                            <th>Unique ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile No</th>
                            <th>Designation</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? (
                            employees.map(employee => (
                                <tr key={employee._id}>
                                    <td>{employee._id}</td>
                                    <td>
                                        <img
                                            src={`http://localhost:8080/uploads/${employee.imgUpload}`}
                                            alt={employee.name}
                                            className="employee-image"
                                        />
                                    </td>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.mobile}</td>
                                    <td>{employee.designation}</td>
                                    <td>{employee.gender === 'M' ? 'Male' : 'Female'}</td>
                                    <td>
                                        <Link to={`/edit-employee/${employee._id}`}>
                                            <button>Edit</button>
                                        </Link>
                                        <button onClick={() => handleDelete(employee._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No employees found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default EmployeeList;
