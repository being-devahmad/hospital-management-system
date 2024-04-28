const express = require('express');
const { patientRgister, loginUser, addNewAdmin } = require('../controllers/userController');

const router = express.Router()

router.post("/patient/register", patientRgister)
router.post("/login", loginUser)
router.post("/admin/addNew", addNewAdmin)

module.exports = router