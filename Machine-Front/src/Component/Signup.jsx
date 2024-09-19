import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: formData.name,
      email: formData.email,
      password: formData.password
    };

    if (!data.username || !data.email || !data.password) {
      alert("Please fill in all fields.");
    } else {
      fetch("http://localhost:8080/api/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Server returned status: ${response.status}`);
          } else {
            alert("Signup successful, Please Login!");
            navigate("/");
          }
        })
        .catch(error => {
          console.error("Error:", error);
          alert("An error occurred while signing up. Please try again later.");
        });
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <h2 className="signup-heading">Sign Up</h2>
          <input type="text" name="name" placeholder="Username" value={formData.name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          <input type="submit" className="signup-btn" value="Sign Up" />
        </form>
      </div>
    </div>
  );
};

export default Signup; // Ensure default export
