import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'; // Assuming you have a Login.css file for styling

export const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { username, password } = formData;

        if (!username || !password) {
            alert('Please fill in all fields.');
            return;
        }

        console.log('Submitting form with username:', username);

        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => {
                console.log('Response status:', response.status);
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Server returned status: ${response.status}`);
                }
            })
            .then((data) => {
                console.log('Login successful:', data);
                const token = data.token;
                localStorage.setItem('token', token);
                if (data.user && data.user.role === 'admin') { // Check if data.user exists
                    navigate(`/admin/${data.user.username}`);
                } else {
                    navigate('/Dashboard');
                }
            })
            .catch((error) => {
                console.error('Error during fetch:', error);
                alert('An error occurred. Please try again.');
            });
    };

    return (
        <div>
            <div className="login-page">
                <div className="login-container">
                    <form onSubmit={handleSubmit} className="login-form">
                        <h2 className="login-heading mb-3">Log In</h2>
                        <div className="login-underline mb-4"></div>
                        <input type="text" className="login-input mb-3" placeholder="Username" name="username" value={formData.username} onChange={handleChange} />
                        <input type="password" className="login-input mb-3" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                        <p className="login-message mb-4"> Don't have an account? <Link className="login-link" to="/signup">Signup</Link></p>
                        <input type="submit" className="login-btn" value="Log in" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
