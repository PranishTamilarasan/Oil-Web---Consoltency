# Backend Tests and Utilities

This folder contains test scripts and utilities for the oil mill platform backend.

## 📁 Test Files

### 🔐 Authentication Tests
- **`createAdmin.js`** - Creates/recreates admin user account
- **`simple-login-test.js`** - Tests admin login credentials
- **`test-admin-login.js`** - Comprehensive admin login testing

### 📊 Dashboard Tests
- **`test-dashboard-api.js`** - Tests dashboard data API endpoints
- **`populate-dashboard.js`** - Populates database with sample data

### 🛒 Order & Payment Tests
- **`test-dummy-payment.js`** - Tests dummy payment system
- **`test-order.js`** - Basic order creation testing
- **`test-orderitem.js`** - Tests order item creation
- **`test-user-orders.js`** - Tests user order retrieval

### 🔧 Debug Utilities
- **`debug-api.js`** - Debug OpenRouter API connections
- **`debug-password.js`** - Debug password hashing issues

### 🤖 AI Tests
- **`test-ai.js`** - Tests AI report generation

## 🚀 How to Use

### 1. Admin Setup
```bash
node createAdmin.js
```
Creates admin user with credentials:
- Email: admin@gmail.com
- Password: admin123

### 2. Populate Dashboard Data
```bash
node populate-dashboard.js
```
Adds sample data for dashboard testing:
- 5 products (3 sale + 2 rental)
- 3 bookings with different statuses
- 2 equipment rentals
- Uses existing users

### 3. Test Login
```bash
node simple-login-test.js
```
Verifies admin login works correctly.

### 4. Test Dashboard API
```bash
node test-dashboard-api.js
```
Checks dashboard data sources and API responses.

### 5. Test Payment System
```bash
node test-dummy-payment.js
```
Tests the dummy payment flow and order creation.

## 📊 Test Categories

### ✅ Working Tests
- Admin login and authentication
- Dashboard data population
- Order creation with dummy payments
- User order retrieval

### 🔧 Debug Tools
- API connection debugging
- Password hash verification
- Database data inspection

## 🎯 Common Issues Fixed

### 1. Admin Login Issues
- **Problem**: Double password hashing
- **Solution**: Use plain password, let schema handle hashing
- **Test**: `simple-login-test.js`

### 2. Dashboard Showing Zeros
- **Problem**: No sample data in database
- **Solution**: Run `populate-dashboard.js`
- **Test**: `test-dashboard-api.js`

### 3. Order Creation Failures
- **Problem**: Schema enum validation errors
- **Solution**: Updated enum values in schemas
- **Test**: `test-dummy-payment.js`

### 4. Payment Processing
- **Problem**: Real payment integration needed
- **Solution**: Implemented dummy payment system
- **Test**: `test-dummy-payment.js`

## 📱 Test Results

### Expected Dashboard Data After Population:
```
👥 Users: 2
📦 Products: 5
📅 Bookings: 3
🏠 Rentals: 2
🛒 Orders: 1+
💰 Revenue: ₹1000+
```

### Expected Admin Credentials:
```
📧 Email: admin@gmail.com
🔑 Password: admin123
👤 Role: ADMIN
```

## 🔄 Running Tests

### Quick Test Suite:
```bash
# 1. Setup admin
node createAdmin.js

# 2. Populate data
node populate-dashboard.js

# 3. Test login
node simple-login-test.js

# 4. Test dashboard
node test-dashboard-api.js

# 5. Test payments
node test-dummy-payment.js
```

### Individual Testing:
Run any specific test file based on what you're debugging.

## 🛠️ Troubleshooting

### If Tests Fail:
1. Check MongoDB connection
2. Verify .env file exists
3. Ensure backend server is running
4. Check for schema validation errors

### Common Errors:
- **"Cannot find module"**: Install missing dependencies
- **"MongoDB connection failed"**: Check MongoDB service
- **"Validation failed"**: Check schema enum values
- **"Authentication failed"**: Recreate admin user

## 📝 Notes

- All tests use the same database as the main application
- Tests may modify existing data
- Run `populate-dashboard.js` to reset sample data
- Admin user is recreated each time `createAdmin.js` runs
- Dummy payment system always succeeds for testing

## 🎉 Success Indicators

When all tests pass, you should see:
- ✅ Admin login working
- ✅ Dashboard populated with data
- ✅ Orders creating successfully
- ✅ Payments processing (dummy)
- ✅ Real-time updates in admin panel
