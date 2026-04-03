// Simple test to check if backend server is running and dashboard API works
const testDashboardAPI = async () => {
    try {
        console.log('🌐 Testing dashboard API...');
        
        const response = await fetch('http://localhost:5000/api/admin/ai/dashboard', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('📡 Response status:', response.status);
        console.log('📡 Response headers:', response.headers);

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Dashboard API Response:');
            console.log('📊 Total Users:', data.totalUsers);
            console.log('📦 Total Products:', data.totalProducts);
            console.log('📅 Total Bookings:', data.totalBookings);
            console.log('🏠 Total Rentals:', data.totalRentals);
            console.log('📋 Recent Users:', data.recentUsers?.length || 0);
            console.log('📋 Recent Bookings:', data.recentBookings?.length || 0);
            console.log('📋 Recent Rentals:', data.recentRentals?.length || 0);
        } else {
            const errorText = await response.text();
            console.log('❌ Dashboard API Error:');
            console.log('Status:', response.status);
            console.log('Status Text:', response.statusText);
            console.log('Error Response:', errorText);
        }

    } catch (error) {
        console.error('🚨 Network Error:', error.message);
        console.log('💡 Possible causes:');
        console.log('1. Backend server not running');
        console.log('2. Wrong URL or port');
        console.log('3. CORS issues');
        console.log('4. Network connectivity');
    }
};

// Test with and without admin token
console.log('🔓 Testing WITHOUT admin token...');
testDashboardAPI();

// Test with admin token (if exists)
const token = localStorage.getItem('token');
if (token) {
    console.log('\n🔑 Testing WITH admin token...');
    fetch('http://localhost:5000/api/admin/ai/dashboard', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('📡 Authenticated response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('✅ Authenticated Dashboard Data:');
        console.log('📊 Total Users:', data.totalUsers);
        console.log('📦 Total Products:', data.totalProducts);
    })
    .catch(error => {
        console.error('❌ Authenticated request failed:', error.message);
    });
} else {
    console.log('\n⚠️ No admin token found in localStorage');
}

console.log('\n💡 If dashboard API fails, check:');
console.log('1. Backend server: npm start (should be on port 5000)');
console.log('2. Database: MongoDB running');
console.log('3. Sample data: npm run test:populate');
console.log('4. API route: /api/admin/ai/dashboard');
