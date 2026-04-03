const express = require('express');
const router = express.Router();
const { 
    generateSummary, 
    generateDetailedReport, 
    getInsights, 
    getDashboardData 
} = require('../controllers/aiReportController');
const { adminAuth } = require('../middleware/auth');

// All AI report routes require admin authentication
router.use(adminAuth);

// Generate AI-powered executive summary
router.post('/summary', generateSummary);

// Generate detailed AI report (with options for type and time range)
// Query parameters: ?reportType=comprehensive&timeRange=monthly
router.post('/detailed', generateDetailedReport);

// Get specific AI insights for metrics
// Query parameters: ?metric=users|bookings|revenue
router.get('/insights', getInsights);

// Get raw dashboard data (fallback without AI)
router.get('/dashboard', getDashboardData);

module.exports = router;
