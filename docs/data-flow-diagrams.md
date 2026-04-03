# Oil Mill Platform - Data Flow Diagrams

## Level 0 DFD (Context Diagram)

```
                    +---------------------+
                    |    External Entities |
                    +---------------------+
                            |
                            | Data Flow
                            v
+----------------------------------------------------------------------------------------+
|                           OIL MILL PLATFORM SYSTEM                                   |
|                                                                                        |
|  +---------------------+    +----------------------+    +--------------------------+ |
|  |     User/Customer   |    |   Admin/Staff        |    |   External APIs          | |
|  +---------------------+    +----------------------+    +--------------------------+ |
|           |                       |                              |                    |
|           v                       v                              v                    |
|  +---------------------+    +----------------------+    +--------------------------+ |
|  |   User Management   |    |   Admin Dashboard   |    |   AI Analytics Service   | |
|  |   - Authentication  |    |   - Reports         |    |   - OpenRouter API       | |
|  |   - Profile         |    |   - Analytics       |    |   - Report Generation    | |
|  +---------------------+    +----------------------+    +--------------------------+ |
|           |                       |                              |                    |
|           v                       v                              v                    |
|  +---------------------+    +----------------------+    +--------------------------+ |
|  |   Product Catalog   |    |   Inventory Mgmt     |    |   Payment Gateway       | |
|  |   - Products         |    |   - Stock Levels     |    |   - Transactions        | |
|  |   - Categories       |    |   - Suppliers        |    |   - Verification        | |
|  +---------------------+    +----------------------+    +--------------------------+ |
|           |                       |                              |                    |
|           v                       v                              v                    |
|  +---------------------+    +----------------------+    +--------------------------+ |
|  |   Booking System    |    |   Equipment Rental   |    |   Email Service          | |
|  |   - Yard Bookings    |    |   - Equipment Mgmt   |    |   - Notifications        | |
|  |   - Time Slots       |    |   - Availability     |    |   - Alerts              | |
|  +---------------------+    +----------------------+    +--------------------------+ |
|           |                       |                              |                    |
|           v                       v                              v                    |
|  +---------------------+    +----------------------+    +--------------------------+ |
|  |     Database         |    |   File Storage       |    |   Logging Service       | |
|  |   - MongoDB          |    |   - Images           |    |   - Error Tracking      | |
|  |   - Collections       |    |   - Documents        |    |   - Audit Trails        | |
|  +---------------------+    +----------------------+    +--------------------------+ |
+----------------------------------------------------------------------------------------+
```

## Level 1 DFD - User Management Subsystem

```
+----------------------+    +---------------------+    +----------------------+
|       User           |    |   Authentication   |    |      Database        |
| (External Entity)     |    |     Process         |    |    (Data Store)      |
+----------------------+    +---------------------+    +----------------------+
           |                          |                          |
           | 1. Login Request         |                          |
           |------------------------->|                          |
           |                          | 2. Validate Credentials |
           |                          |------------------------>|
           |                          |                          | 3. User Data
           |                          |<------------------------|
           |                          |                          |
           | 4. Authentication Result|                          |
           |<-------------------------|                          |
           |                          |                          |
           | 5. Registration Data     |                          |
           |------------------------->|                          |
           |                          | 6. Create User Record   |
           |                          |------------------------>|
           |                          |                          |
           | 7. User Profile          |                          |
           |<-------------------------|                          |
           |                          |                          |
+----------------------+    +---------------------+    +----------------------+
|   Email Service       |    |   Session Manager   |    |   Audit Log          |
| (External Entity)     |    |     Process         |    |    (Data Store)      |
+----------------------+    +---------------------+    +----------------------+
           |                          |                          |
           | 8. Welcome Email         |                          |
           |<-------------------------|                          |
           |                          | 9. Create Session       |
           |                          |------------------------>|
           |                          |                          |
           |                          |                          | 10. Session Data
           |                          |<------------------------|
```

## Level 1 DFD - Product & Booking System

```
+----------------------+    +---------------------+    +----------------------+
|       Customer       |    |   Product Manager   |    |      Database        |
| (External Entity)     |    |     Process         |    |    (Data Store)      |
+----------------------+    +---------------------+    +----------------------+
           |                          |                          |
           | 1. Browse Products       |                          |
           |------------------------->|                          |
           |                          | 2. Fetch Products       |
           |                          |------------------------>|
           |                          |                          | 3. Product List
           |                          |<------------------------|
           |                          |                          |
           | 4. Product Details       |                          |
           |<-------------------------|                          |
           |                          |                          |
           | 5. Booking Request       |                          |
           |------------------------->|                          |
           |                          | 6. Check Availability   |
           |                          |------------------------>|
           |                          |                          | 7. Availability Status
           |                          |<------------------------|
           |                          |                          |
           | 8. Create Booking        |                          |
           |                          |------------------------>|
           |                          |                          | 9. Booking Record
           |                          |<------------------------|
           |                          |                          |
           |10. Confirmation         |                          |
           |<-------------------------|                          |
           |                          |                          |
+----------------------+    +---------------------+    +----------------------+
|   Payment Gateway     |    |   Inventory Manager  |    |   Notification Svc    |
| (External Entity)     |    |     Process         |    |    (Data Store)      |
+----------------------+    +---------------------+    +----------------------+
           |                          |                          |
           |11. Payment Request       |                          |
           |<-------------------------|                          |
           |                          |12. Update Stock         |
           |                          |------------------------>|
           |                          |                          |
           |13. Payment Confirmation  |                          |
           |------------------------->|                          |
           |                          |14. Send Notification    |
           |                          |------------------------>|
```

## Level 1 DFD - Equipment Rental System

```
+----------------------+    +---------------------+    +----------------------+
|       Customer       |    |   Rental Manager    |    |      Database        |
| (External Entity)     |    |     Process         |    |    (Data Store)      |
+----------------------+    +---------------------+    +----------------------+
           |                          |                          |
           | 1. View Equipment       |                          |
           |------------------------->|                          |
           |                          | 2. Fetch Equipment      |
           |                          |------------------------>|
           |                          |                          | 3. Equipment List
           |                          |<------------------------|
           |                          |                          |
           | 4. Equipment Details    |                          |
           |<-------------------------|                          |
           |                          |                          |
           | 5. Rental Request       |                          |
           |------------------------->|                          |
           |                          | 6. Check Availability   |
           |                          |------------------------>|
           |                          |                          | 7. Availability
           |                          |<------------------------|
           |                          |                          |
           | 8. Create Rental        |                          |
           |                          |------------------------>|
           |                          |                          | 9. Rental Record
           |                          |<------------------------|
           |                          |                          |
           |10. Rental Confirmation  |                          |
           |<-------------------------|                          |
           |                          |                          |
+----------------------+    +---------------------+    +----------------------+
|   Admin Staff         |    |   Availability Mgr   |    |   Calendar Service    |
| (External Entity)     |    |     Process         |    |    (Data Store)      |
+----------------------+    +---------------------+    +----------------------+
           |                          |                          |
           |11. Update Status         |                          |
           |------------------------->|                          |
           |                          |12. Update Calendar      |
           |                          |------------------------>|
           |                          |                          |
           |13. Status Updated       |                          |
           |<-------------------------|                          |
```

## Level 1 DFD - AI Analytics System

```
+----------------------+    +---------------------+    +----------------------+
|       Admin          |    |   AI Report Engine  |    |      Database        |
| (External Entity)     |    |     Process         |    |    (Data Store)      |
+----------------------+    +---------------------+    +----------------------+
           |                          |                          |
           | 1. Request Report        |                          |
           |------------------------->|                          |
           |                          | 2. Aggregate Data        |
           |                          |------------------------>|
           |                          |                          | 3. Dashboard Data
           |                          |<------------------------|
           |                          |                          |
           |                          | 4. Format for AI        |
           |                          |                          |
           |                          | 5. Send to AI Service    |
           |                          |------------------------>|
           |                          |                          |
           |                          | 6. AI Analysis          |
           |                          |<------------------------|
           |                          |                          |
           | 7. Generated Report     |                          |
           |<-------------------------|                          |
           |                          |                          |
+----------------------+    +---------------------+    +----------------------+
|  OpenRouter AI        |    |   Report Formatter   |    |   File Storage        |
| (External Entity)     |    |     Process         |    |    (Data Store)      |
+----------------------+    +---------------------+    +----------------------+
           |                          |                          |
           | 8. API Response          |                          |
           |------------------------->|                          |
           |                          | 9. Format Report        |
           |                          |                          |
           |                          |10. Save Report          |
           |                          |------------------------>|
           |                          |                          |
           |                          |                          |11. PDF Download
           |                          |<------------------------|
```

## Data Dictionary

### Entities and Attributes

**User**
- user_id: ObjectId (Primary Key)
- name: String
- email: String (Unique)
- password: String (Hashed)
- phone_number: String
- address: String
- role: String (USER/ADMIN)
- created_at: Date
- updated_at: Date

**Product**
- product_id: ObjectId (Primary Key)
- product_name: String
- category: String
- price: Number
- stock_quantity: Number
- image_url: String
- description: String
- sizes: Array
- benefits: Array
- item_type: String (sale/rental)
- created_at: Date
- updated_at: Date

**Booking**
- booking_id: ObjectId (Primary Key)
- user_id: ObjectId (Foreign Key)
- booking_date: Date
- time_slot: String
- area_size: Number
- booking_status: String (pending/confirmed/cancelled)
- created_at: Date
- updated_at: Date

**Rental**
- rental_id: ObjectId (Primary Key)
- user_id: ObjectId (Foreign Key)
- equipment_id: ObjectId (Foreign Key)
- equipment_name: String
- start_date: Date
- end_date: Date
- time_slot: String
- total_price: Number
- status: String (Pending/Approved/Rejected/Completed)
- message: String
- contact_info: Object
- created_at: Date
- updated_at: Date

### Data Flows

**Authentication Flow**
1. Login Request: {email, password}
2. Authentication Response: {user_data, token, status}
3. Registration Data: {name, email, password, phone, address}
4. User Profile: {user_id, name, email, phone, address, role}

**Product Flow**
1. Product Query: {category, search_term, filters}
2. Product List: [{product_data}]
3. Product Details: {complete_product_info}
4. Booking Request: {product_id, user_id, booking_details}

**AI Analytics Flow**
1. Report Request: {report_type, time_range, metric}
2. Dashboard Data: {users_count, products_count, bookings_data, rentals_data}
3. AI Prompt: {formatted_data + analysis_instructions}
4. AI Response: {generated_insights, recommendations}
5. Formatted Report: {markdown_content, metadata}

## Security & Data Flow Considerations

### Authentication & Authorization
- JWT tokens for API authentication
- Role-based access control (USER/ADMIN)
- Session management with expiration
- Password hashing with bcrypt

### Data Validation
- Input sanitization for all user inputs
- Email format validation
- Phone number format validation
- Date and time validation for bookings

### Error Handling
- Graceful degradation for AI service failures
- Fallback to mock data when external services unavailable
- Comprehensive error logging
- User-friendly error messages

### Performance Optimization
- Database indexing on frequently queried fields
- Caching for product catalogs
- Async processing for AI report generation
- Pagination for large data sets
