const User = require('../models/User');
const Product = require('../models/Product');
const Booking = require('../models/Booking');
const Rental = require('../models/Rental');

// Initialize OpenRouter (will be configured with API key from .env)
let openrouter;
try {
    const { OpenRouter } = require('@openrouter/sdk');
    console.log('OPENROUTER_API_KEY from env:', process.env.OPENROUTER_API_KEY ? 'EXISTS' : 'MISSING');
    if (process.env.OPENROUTER_API_KEY) {
        openrouter = new OpenRouter({
            apiKey: process.env.OPENROUTER_API_KEY
        });
        console.log('✅ OpenRouter initialized successfully');
    } else {
        console.log('⚠️ OPENROUTER_API_KEY not found in .env');
    }
} catch (error) {
    console.log('❌ OpenRouter SDK error:', error.message);
}

// Get dashboard data for AI analysis
const getDashboardData = async () => {
    const totalUsers = await User.countDocuments({ role: 'USER' });
    const totalProducts = await Product.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalRentals = await Rental.countDocuments();
    
    const recentUsers = await User.find({ role: 'USER' }).sort({ createdAt: -1 }).limit(5);
    const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5);
    const recentRentals = await Rental.find().sort({ createdAt: -1 }).limit(5);
    
    const bookingsByStatus = await Booking.aggregate([
        { $group: { _id: '$booking_status', count: { $sum: 1 } } }
    ]);
    
    const rentalsByStatus = await Rental.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const topProducts = await Product.find({ itemType: 'sale' }).sort({ stock_quantity: -1 }).limit(5);
    const rentalEquipment = await Product.find({ itemType: 'rental' }).sort({ price: -1 }).limit(5);

    return {
        totalUsers,
        totalProducts,
        totalBookings,
        totalRentals,
        recentUsers,
        recentBookings,
        recentRentals,
        bookingsByStatus,
        rentalsByStatus,
        topProducts,
        rentalEquipment,
        date: new Date().toISOString()
    };
};

// Generate AI-powered summary
exports.generateSummary = async (req, res) => {
    try {
        // Check if OpenRouter SDK is installed
        if (!openrouter) {
            // Fallback to mock summary if SDK not installed
            const dashboardData = await getDashboardData();
            const mockSummary = generateMockSummary(dashboardData);
            
            return res.json({
                summary: mockSummary,
                data: dashboardData,
                timestamp: new Date().toISOString(),
                fallback: true
            });
        }

        // Check if API key is available
        if (!process.env.OPENROUTER_API_KEY) {
            const dashboardData = await getDashboardData();
            const mockSummary = generateMockSummary(dashboardData);
            
            return res.json({
                summary: mockSummary + '\n\n⚠️ *Note: Using mock data. Add OPENROUTER_API_KEY to .env for AI-powered analysis.*',
                data: dashboardData,
                timestamp: new Date().toISOString(),
                fallback: true
            });
        }

        const dashboardData = await getDashboardData();
        
        const prompt = `As an expert business analyst, analyze this oil mill platform dashboard data and provide a comprehensive executive summary:

Dashboard Data:
${JSON.stringify(dashboardData, null, 2)}

Please provide:
1. Key Performance Highlights
2. Business Insights
3. Areas of Concern
4. Recommendations
5. Growth Opportunities

Keep it professional, concise, and actionable. Format as a structured report.`;

        const response = await openrouter.chat.send({
            chatGenerationParams: {
                model: "stepfun/step-3.5-flash:free",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            }
        });

        res.json({
            summary: response.choices[0].message.content,
            data: dashboardData,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('AI Summary Error:', error);
        
        // Fallback to mock summary on any error
        try {
            const dashboardData = await getDashboardData();
            const mockSummary = generateMockSummary(dashboardData);
            
            res.json({
                summary: mockSummary + '\n\n⚠️ *Note: AI service unavailable. Showing mock analysis.*',
                data: dashboardData,
                timestamp: new Date().toISOString(),
                fallback: true
            });
        } catch (fallbackError) {
            res.status(500).json({ 
                message: 'Failed to generate summary and fallback',
                error: error.message 
            });
        }
    }
};

// Generate mock summary as fallback
const generateMockSummary = (data) => {
    return `# Executive Summary

## Key Performance Highlights
- **Total Users**: ${data.totalUsers} registered customers
- **Product Catalog**: ${data.totalProducts} products available
- **Bookings**: ${data.totalBookings} total yard bookings
- **Equipment Rentals**: ${data.totalRentals} equipment rentals

## Business Insights
- User engagement shows steady growth with ${data.totalUsers} active customers
- Product inventory is well-maintained with ${data.totalProducts} items
- Booking utilization indicates healthy demand for mill services
- Equipment rental segment shows promising adoption

## Areas of Concern
- Monitor booking completion rates for operational efficiency
- Track equipment utilization to optimize rental fleet
- Ensure adequate inventory levels for popular products
- User retention strategies may need enhancement

## Recommendations
1. **Optimize Operations**: Implement automated booking confirmations
2. **Expand Rental Fleet**: Consider adding more equipment based on demand
3. **Marketing Campaign**: Target user acquisition and retention
4. **Inventory Management**: Set up automated stock alerts

## Growth Opportunities
- Introduce premium equipment tiers
- Expand service offerings to neighboring areas
- Implement loyalty programs for repeat customers
- Develop mobile app for better user experience`;
};

// Generate detailed AI report
exports.generateDetailedReport = async (req, res) => {
    try {
        if (!openrouter) {
            return res.status(500).json({ 
                message: 'OpenRouter SDK not installed. Please install @openrouter/sdk package.' 
            });
        }

        const { reportType = 'comprehensive', timeRange = 'monthly' } = req.query;
        const dashboardData = await getDashboardData();
        
        const prompt = `Generate a detailed ${timeRange} ${reportType} report for an oil mill business platform. 

Dashboard Data:
${JSON.stringify(dashboardData, null, 2)}

Create a professional report with these sections:
1. Executive Summary
2. Performance Metrics
3. User Engagement Analysis
4. Revenue & Bookings Analysis
5. Inventory & Equipment Utilization
6. Operational Insights
7. Strategic Recommendations
8. Action Items

Include specific numbers, percentages, and actionable insights. Format in markdown for easy reading.`;

        const response = await openrouter.chat.send({
            chatGenerationParams: {
                model: "stepfun/step-3.5-flash:free",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            }
        });

        res.json({
            report: response.choices[0].message.content,
            reportType,
            timeRange,
            data: dashboardData,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('AI Report Error:', error);
        res.status(500).json({ 
            message: 'Failed to generate AI report',
            error: error.message 
        });
    }
};

// Get AI insights for specific metrics
exports.getInsights = async (req, res) => {
    try {
        if (!openrouter) {
            return res.status(500).json({ 
                message: 'OpenRouter SDK not installed. Please install @openrouter/sdk package.' 
            });
        }

        const { metric } = req.query;
        const dashboardData = await getDashboardData();
        
        let prompt = '';
        
        switch(metric) {
            case 'users':
                prompt = `Analyze user growth and engagement from this data: ${JSON.stringify(dashboardData, null, 2)}. Focus on user registration trends, activity patterns, and retention insights.`;
                break;
            case 'bookings':
                prompt = `Analyze booking patterns from this data: ${JSON.stringify(dashboardData, null, 2)}. Focus on booking trends, peak times, and utilization rates.`;
                break;
            case 'revenue':
                prompt = `Analyze revenue potential from this data: ${JSON.stringify(dashboardData, null, 2)}. Focus on product performance, rental utilization, and growth opportunities.`;
                break;
            default:
                prompt = `Provide business insights from this dashboard data: ${JSON.stringify(dashboardData, null, 2)}. Focus on key metrics and actionable recommendations.`;
        }

        const response = await openrouter.chat.send({
            chatGenerationParams: {
                model: "stepfun/step-3.5-flash:free",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            }
        });

        res.json({
            insights: response.choices[0].message.content,
            metric: metric || 'general',
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('AI Insights Error:', error);
        res.status(500).json({ 
            message: 'Failed to generate AI insights',
            error: error.message 
        });
    }
};

// Get dashboard data without AI (fallback)
exports.getDashboardData = async (req, res) => {
    try {
        const data = await getDashboardData();
        res.json(data);
    } catch (error) {
        console.error('Dashboard Data Error:', error);
        res.status(500).json({ 
            message: 'Failed to fetch dashboard data',
            error: error.message 
        });
    }
};
