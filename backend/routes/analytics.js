const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getSummary } = require('../controllers/analyticsController');

router.use(authMiddleware);

router.get('/summary', getSummary);

module.exports = router;
