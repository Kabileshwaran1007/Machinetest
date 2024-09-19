import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateEmployee.css';
import { Navbar } from './Navbar';
const UpdateEmployee = () => {
    const { id } = useParams(); // Extract the dynamic ID from the URL
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: 'M', // Default value
    });
    const [selectedFile, setSelectedFile] = useState(null); // State to hold the uploaded file
    const [error, setError] = useState("");

    // Fetch employee data on component mount
    useEffect(() => {
        console.log('Fetching employee with ID:', id);
        axios.get(`http://localhost:8080/api/employees/${id}`)
            .then(response => {
                console.log('Full response data:', response.data);
                if (response.data && response.data.formData) {
                    const emp = response.data.formData;
                    setEmployee({
                        name: emp.name || '',
                        email: emp.email || '',
                        mobile: emp.mobile || '',
                        designation: emp.designation || '',
                        gender: emp.gender || 'M',
                    });
                } else {
                    setError('Invalid employee data received');
                }
            })
            .catch(error => {
                console.error('Error fetching employee data:', error.response ? error.response.data : error.message);
                setError('Error fetching employee data');
            });
    }, [id]);

    // Handle text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prevState => ({ ...prevState, [name]: value }));
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('mobile', employee.mobile);
        formData.append('designation', employee.designation);
        formData.append('gender', employee.gender);

        if (selectedFile) {
            formData.append('imgUpload', selectedFile);
        }

        handleUpdate(formData);
    };

    // Update employee data with file upload
    const handleUpdate = async (formData) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/employees/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            navigate('/employeelist');
        } catch (error) {
            console.error('Error updating submission:', error);
            setError('Error updating submission');
        }
    };

    return (
        <>
            <Navbar />

            <div className="update-employee-container">
                <h2>Update Employee</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit} className="update-employee-form" encType="multipart/form-data">
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={employee.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={employee.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Mobile No:
                        <input
                            type="text"
                            name="mobile"
                            value={employee.mobile}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Designation:
                        <input
                            type="text"
                            name="designation"
                            value={employee.designation}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Gender:
                        <select
                            name="gender"
                            value={employee.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </label>
                    <label>
                        Upload Profile Image:
                        <input
                            type="file"
                            name="imgUpload"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </label>
                    <button type="submit">Update</button>
                </form>
            </div>
        </>
    );
};

export default UpdateEmployee;
