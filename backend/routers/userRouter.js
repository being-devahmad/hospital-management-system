const express = require('express');
const { patientRgister, loginUser, addNewAdmin } = require('../controllers/userController');
const { isAdminAuthenticated, isPatientAuthenticated } = require("../middlewares/auth")

const router = express.Router()

router.post("/patient/register", patientRgister)
router.post("/login", loginUser)
router.post("/admin/addNew", isAdminAuthenticated, addNewAdmin)

module.exports = router