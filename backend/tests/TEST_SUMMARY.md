# Backend Test Organization Summary

## 📁 Files Organized

All test and utility files have been moved to the `tests/` folder for better organization.

### 🗂️ Test Categories

#### 🔐 Authentication & Admin Setup
- `createAdmin.js` - Creates admin user (admin@gmail.com / admin123)
- `simple-login-test.js` - Tests admin login functionality
- `test-admin-login.js` - Comprehensive login testing

#### 📊 Dashboard & Data
- `populate-dashboard.js` - Populates database with sample data
- `test-dashboard-api.js` - Tests dashboard API endpoints

#### 🛒 Orders & Payments
- `test-dummy-payment.js` - Tests dummy payment system
- `test-order.js` - Basic order creation testing
- `test-orderitem.js` - Tests order item creation
- `test-user-orders.js` - Tests user order retrieval

#### 🔧 Debug & Utilities
- `debug-api.js` - Debug OpenRouter API connections
- `debug-password.js` - Debug password hashing issues
- `debug-orders.js` - Debug order database issues

#### 🤖 AI Features
- `test-ai.js` - Tests AI report generation

## 🚀 Usage

### Run All Tests
```bash
npm test
# or
node tests/run-all-tests.js
```

### Run Individual Tests
```bash
npm run test:admin      # Create admin user
npm run test:login      # Test login
npm run test:dashboard  # Test dashboard API
npm run test:populate   # Populate sample data
npm run test:payment    # Test payment system
npm run test:orders     # Test order system
```

### Quick Setup
```bash
# 1. Create admin
npm run test:admin

# 2. Populate data
npm run test:populate

# 3. Test everything
npm test
```

## 📊 Expected Results

### After Running Tests:
- ✅ Admin user created and login working
- ✅ Dashboard populated with sample data:
  - 2 users
  - 5 products (3 sale + 2 rental)
  - 3 bookings
  - 2 rentals
  - 1+ orders
- ✅ Payment system working (dummy)
- ✅ Order creation and retrieval working

### Dashboard Metrics:
- Total Users: 2
- Total Products: 5
- Total Bookings: 3
- Total Rentals: 2
- Pending Orders: 1
- Active Bookings: 2
- Estimated Revenue: ₹1,000

## 🎯 Test Coverage

### ✅ Working Features:
- [x] Admin authentication
- [x] User registration/login
- [x] Dashboard data population
- [x] Order creation (dummy payment)
- [x] Order retrieval by user
- [x] Booking management
- [x] Equipment rental
- [x] Product management
- [x] Real-time updates

### 🔧 Debug Capabilities:
- [x] API connection testing
- [x] Password hash verification
- [x] Database data inspection
- [x] Schema validation debugging

## 🛠️ Troubleshooting

### Common Issues & Solutions:
1. **Admin login fails** → Run `npm run test:admin`
2. **Dashboard shows zeros** → Run `npm run test:populate`
3. **Orders not creating** → Run `npm run test:payment`
4. **API errors** → Check `debug-api.js`

### Test Dependencies:
- MongoDB connection required
- .env file with proper variables
- Node.js installed
- All npm packages installed

## 📱 Integration with Frontend

After running tests:
1. Start backend: `npm start`
2. Login to admin: http://localhost:3000/admin-login
3. Use credentials: admin@gmail.com / admin123
4. View populated dashboard
5. Test order creation from frontend

## 🎉 Success Indicators

When all tests pass:
- ✅ Backend server starts without errors
- ✅ Admin login works
- ✅ Dashboard shows real data
- ✅ Frontend can create orders
- ✅ Orders appear in admin panel
- ✅ Real-time updates working

## 📝 Notes

- Tests modify database data
- Run `populate-dashboard.js` to reset sample data
- Admin user is recreated each time `createAdmin.js` runs
- Dummy payment system always succeeds for testing
- All tests use the same database as main application

## 🔄 Maintenance

### Regular Tasks:
- Run `npm test` after major changes
- Update test data if schema changes
- Add new tests for new features
- Keep README.md updated

### Test Data Reset:
```bash
npm run test:populate  # Refresh sample data
npm run test:admin     # Reset admin user
```

This organization makes it easy to:
- Run specific tests for debugging
- Maintain test suite
- Onboard new developers
- Ensure backend functionality
