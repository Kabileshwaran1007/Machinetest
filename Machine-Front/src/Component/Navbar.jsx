import React from 'react'

export const Navbar = () => {
    return (
        <div>
            <header className="header">
                <nav className="nav">
                    <a href="/Dashboard" className="nav-link">Home</a>
                    <a href="/EmployeeComponent" className="nav-link">Create Employee</a>
                    <a href="/EmployeeList" className="nav-link">Employee List</a>
                    <span className="user-name">Hukum Gupta - </span>
                    <a href="/" className="nav-link">Logout</a>
                </nav>
            </header>
        </div>
    )
}
