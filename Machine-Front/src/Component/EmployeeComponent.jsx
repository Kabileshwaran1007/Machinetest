import React, { useState } from 'react';
import axios from 'axios';
import './EmployeeComponent.css';
import { Navbar } from './Navbar';

const EmployeeComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    imgUpload: null,
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(""); // For displaying submission errors

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      imgUpload: e.target.files[0],
    });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedCourses = [...formData.courses];

    if (checked) {
      updatedCourses.push(value);
    } else {
      updatedCourses = updatedCourses.filter((course) => course !== value);
    }

    setFormData({
      ...formData,
      courses: updatedCourses,
    });
  };

  // Validate form fields
  const validate = () => {
    let formErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^[0-9]+$/;

    // Name Validation
    if (!formData.name) formErrors.name = "Name is required";

    // Email Validation
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      formErrors.email = "Invalid email format";
    }

    // Mobile Number Validation
    if (!formData.mobile) {
      formErrors.mobile = "Mobile number is required";
    } else if (!mobilePattern.test(formData.mobile)) {
      formErrors.mobile = "Mobile number must be numeric";
    }

    // Designation Validation
    if (!formData.designation) formErrors.designation = "Designation is required";

    // Gender Validation
    if (!formData.gender) formErrors.gender = "Gender is required";

    // Image Upload Validation
    if (!formData.imgUpload) {
      formErrors.imgUpload = "Image upload is required";
    } else if (
      formData.imgUpload.type !== "image/jpeg" &&
      formData.imgUpload.type !== "image/png"
    ) {
      formErrors.imgUpload = "Only JPG and PNG files are allowed";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError(""); // Reset previous submission errors
    if (validate()) {
      // Prepare FormData for file upload and other fields
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("mobile", formData.mobile);
      formDataToSend.append("designation", formData.designation);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("courses", formData.courses.join(", "));
      formDataToSend.append("imgUpload", formData.imgUpload);

      // Submit form data to server using axios
      axios
        .post("http://localhost:8080/api/addEmployee", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Form submitted successfully", response.data);
        })
        .catch((error) => {
          if (error.response) {
            // Server responded with a status other than 2xx
            console.error('Response Error:', error.response.data);
            setSubmitError(`Error: ${error.response.data.message || 'Server error occurred'}`);
          } else if (error.request) {
            // Request was made but no response received
            console.error('Request Error:', error.request);
            setSubmitError('Error: No response from server');
          } else {
            // Something happened in setting up the request
            console.error('Error:', error.message);
            setSubmitError(`Error: ${error.message}`);
          }
        });
    }
  };

  return (
    <>
      <div className='logo'>
        <h1>Logo</h1>
      </div>
      <Navbar />
      <div className='employee-form-container'>
        <h2>Create Employee</h2>
        {submitError && <div className="submit-error">{submitError}</div>}
      </div>
      <form className='employee-form' onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span>{errors.name}</span>}
        </div>

        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span>{errors.email}</span>}
        </div>

        <div>
          <label>Mobile No:</label>
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
          {errors.mobile && <span>{errors.mobile}</span>}
        </div>

        <div>
          <label>Designation:</label>
          <select name="designation" value={formData.designation} onChange={handleChange}>
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          {errors.designation && <span>{errors.designation}</span>}
        </div>

        <div>
          <label>Gender:</label>
          <input type="radio" name="gender" value="M" onChange={handleChange} /> Male
          <input type="radio" name="gender" value="F" onChange={handleChange} /> Female
          {errors.gender && <span>{errors.gender}</span>}
        </div>

        <div>
          <label>Course:</label>
          <input type="checkbox" name="courses" value="MCA" onChange={handleCheckboxChange} /> MCA
          <input type="checkbox" name="courses" value="BCA" onChange={handleCheckboxChange} /> BCA
          <input type="checkbox" name="courses" value="BSC" onChange={handleCheckboxChange} /> BSC
        </div>

        <div>
          <label>Img Upload:</label>
          <input type="file" name="imgUpload" onChange={handleFileChange} />
          {errors.imgUpload && <span>{errors.imgUpload}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default EmployeeComponent;
