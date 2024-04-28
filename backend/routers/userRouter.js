const express = require('express');
const { patientRgister, loginUser } = require('../controllers/userController');

const router = express.Router()

router.post("/patient/register", patientRgister)
router.post("/login", loginUser)

module.exports = router