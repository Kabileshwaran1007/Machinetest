const FormEmployee = require('../models/EmployeeModel');

// Handle form data and file upload
exports.Employee = async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, courses } = req.body;
    const imgUpload = req.file;

    if (!name || !email || !mobile || !designation || !gender || !imgUpload) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^[0-9]+$/;

    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!mobilePattern.test(mobile)) {
      return res.status(400).json({ error: 'Mobile number must be numeric' });
    }

    const newFormEmployee = new FormEmployee({
      name,
      email,
      mobile,
      designation,
      gender,
      courses: courses ? courses.split(',') : [],
      imgUpload: imgUpload.path // Path where the file is saved
    });

    await newFormEmployee.save();
    res.status(200).json({ message: 'Form submitted successfully', formData: newFormEmployee });
  } catch (error) {
    console.error('Error submitting the form', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Retrieve all submissions
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await FormEmployee.find();
    res.status(200).json({ employees });
  } catch (error) {
    console.error('Error fetching employees', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Handle updating a form submission
exports.findEmployee = async (req, res) => {
  try {
    const { id } = req.params;
  
    const employee = await FormEmployee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
  
    await employee.save();
    res.status(200).json({ message: 'Form employee updated successfully', formData: employee });
  } catch (error) {
    console.error('Error updating the form employee', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, designation, gender, courses } = req.body;
    const imgUpload = req.file;

    const employee = await FormEmployee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.mobile = mobile || employee.mobile;
    employee.designation = designation || employee.designation;
    employee.gender = gender || employee.gender;
    employee.courses = courses ? courses.split(',') : employee.courses;

    if (imgUpload) {
      employee.imgUpload = imgUpload.path;
    }

    await employee.save();
    res.status(200).json({ message: 'Form employee updated successfully', formData: employee });
  } catch (error) {
    console.error('Error updating the form employee', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Handle deleting a form employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await FormEmployee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ message: 'Form employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting the form employee', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
