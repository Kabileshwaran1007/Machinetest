const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerConfig');
const FormEmployee = require('../controllers/EmployeeController');

// Handle form submission
router.post('/addEmployee', upload.single('imgUpload'), FormEmployee.Employee);
// Route for getting all submissions
router.get('/employees', FormEmployee.getAllEmployees);

// Route for updating a form submission
router.get('/employees/:id', FormEmployee.findEmployee);

router.put('/employees/update/:id', upload.single('imgUpload'), FormEmployee.updateEmployee);

// Route for deleting a form submission
router.delete('/deleteemployees/:id', FormEmployee.deleteEmployee);

module.exports = router;
