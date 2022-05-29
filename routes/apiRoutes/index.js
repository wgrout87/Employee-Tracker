const express = require('express');
const router = express.Router();
const { departmentRoutes } = require('./departmentRoutes');
const { roleRoutes } = require('./roleRoutes');
const { employeeRoutes } = require('./employeeRoutes');

router.use(departmentRoutes);
router.use(roleRoutes);
router.use(employeeRoutes);

module.exports = router;