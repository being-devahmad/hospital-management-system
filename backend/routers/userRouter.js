const express = require('express');
const { patientRgister, loginUser, addNewAdmin, getAllDoctors, getUserDetails } = require('../controllers/userController');
const { isAdminAuthenticated, isPatientAuthenticated } = require("../middlewares/auth")

const router = express.Router()

router.post("/patient/register", patientRgister)
router.post("/login", loginUser)
router.post("/admin/addNew", isAdminAuthenticated, addNewAdmin)
router.get("/doctors", getAllDoctors)
router.get("/admin/me", isAdminAuthenticated, getUserDetails)
router.get("/patient/me", isPatientAuthenticated, getUserDetails)

module.exports = router