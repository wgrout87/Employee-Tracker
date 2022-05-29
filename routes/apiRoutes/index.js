const express = require('express');
const router = express.Router();
const { departmentRoutes } = require('./departmentRoutes');
const { employeeRoutes } = require('./employeeRoutes');

router.use(departmentRoutes);
router.use(require('./roleRoutes'));
router.use(employeeRoutes);

module.exports = router;