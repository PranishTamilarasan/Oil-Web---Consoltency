require('dotenv').config();

// Test runner for all backend tests
const runAllTests = async () => {
    console.log('🧪 Starting Backend Test Suite\n');
    console.log('=' .repeat(50));

    const tests = [
        {
            name: 'Admin Setup',
            file: 'createAdmin.js',
            description: 'Creates admin user account'
        },
        {
            name: 'Login Test',
            file: 'simple-login-test.js',
            description: 'Tests admin login credentials'
        },
        {
            name: 'Dashboard Population',
            file: 'populate-dashboard.js',
            description: 'Populates database with sample data'
        },
        {
            name: 'Dashboard API Test',
            file: 'test-dashboard-api.js',
            description: 'Tests dashboard data endpoints'
        },
        {
            name: 'Dummy Payment Test',
            file: 'test-dummy-payment.js',
            description: 'Tests payment system'
        },
        {
            name: 'User Orders Test',
            file: 'test-user-orders.js',
            description: 'Tests user order retrieval'
        }
    ];

    let passedTests = 0;
    let failedTests = 0;

    for (let i = 0; i < tests.length; i++) {
        const test = tests[i];
        console.log(`\n${i + 1}. ${test.name}`);
        console.log(`   📝 ${test.description}`);
        console.log(`   📁 File: ${test.file}`);
        console.log('   ' .repeat(40));

        try {
            // Import and run the test
            const { execSync } = require('child_process');
            const result = execSync(`node ${test.file}`, { 
                encoding: 'utf8',
                stdio: 'pipe',
                cwd: __dirname
            });

            console.log('   ✅ PASSED');
            console.log('   📄 Output:', result.split('\n').slice(-3).join('\n'));
            passedTests++;

        } catch (error) {
            console.log('   ❌ FAILED');
            console.log('   🚨 Error:', error.message);
            failedTests++;
        }
    }

    console.log('\n' + '=' .repeat(50));
    console.log('🏁 Test Suite Complete');
    console.log(`✅ Passed: ${passedTests}/${tests.length}`);
    console.log(`❌ Failed: ${failedTests}/${tests.length}`);
    
    if (failedTests === 0) {
        console.log('\n🎉 All tests passed! Your backend is ready.');
        console.log('\n📱 Next steps:');
        console.log('1. Start backend server: npm start');
        console.log('2. Login to admin panel: http://localhost:3000/admin-login');
        console.log('3. Test frontend functionality');
    } else {
        console.log('\n🔧 Some tests failed. Check the errors above.');
        console.log('💡 Run individual tests to debug specific issues.');
    }

    console.log('\n📚 Test files available:');
    tests.forEach((test, index) => {
        console.log(`${index + 1}. ${test.name}: node ${test.file}`);
    });
};

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
    console.log('🧪 Backend Test Runner');
    console.log('\nUsage:');
    console.log('  node run-all-tests.js              # Run all tests');
    console.log('  node run-all-tests.js --help       # Show this help');
    console.log('\nAvailable tests:');
    console.log('  - Admin Setup (createAdmin.js)');
    console.log('  - Login Test (simple-login-test.js)');
    console.log('  - Dashboard Population (populate-dashboard.js)');
    console.log('  - Dashboard API Test (test-dashboard-api.js)');
    console.log('  - Dummy Payment Test (test-dummy-payment.js)');
    console.log('  - User Orders Test (test-user-orders.js)');
    process.exit(0);
}

// Run the tests
runAllTests().catch(console.error);
