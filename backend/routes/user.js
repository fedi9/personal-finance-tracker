const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getProfile, updatePassword } = require('../controllers/userController');

router.use(authMiddleware); // Protect all routes

router.get('/all', getProfile);
router.put('/password', updatePassword);

module.exports = router;
