# 🏗️ eCommerce System Architecture

## 📊 System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Client)                        │
│                                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ index.   │  │products. │  │ login.   │  │ signup.  │       │
│  │  html    │  │  html    │  │  html    │  │  html    │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│       │             │              │              │              │
│  ┌────┴─────────────┴──────────────┴──────────────┴──────┐     │
│  │              JavaScript Files (js/)                     │     │
│  │  • api.js (API wrapper)                                │     │
│  │  • auth.js (authentication)                            │     │
│  │  • products.js (product display)                       │     │
│  │  • user-session.js (session management)               │     │
│  └──────────────────────────────────────────────────────┘     │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ HTTP/HTTPS Requests
                            │ (Fetch API + JWT Token)
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│                      BACKEND (Server)                            │
│                       Express.js API                             │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Routes (routes/)                       │  │
│  │                                                            │  │
│  │  /api/auth      →  Signup, Login, Logout                 │  │
│  │  /api/products  →  CRUD, Search, Filter, Reviews         │  │
│  │  /api/cart      →  Add, Update, Remove Items             │  │
│  │  /api/wishlist  →  Save Favorite Products                │  │
│  │  /api/orders    →  Create, Track, Manage Orders          │  │
│  │  /api/user      →  Profile, Addresses                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            │                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Middleware (middleware/)                     │  │
│  │                                                            │  │
│  │  • JWT Verification                                       │  │
│  │  • Role-Based Access Control                             │  │
│  │  • Error Handling                                         │  │
│  │  • CORS Configuration                                     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            │                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │               Models (models/)                            │  │
│  │                                                            │  │
│  │  • User Schema (Mongoose)                                │  │
│  │  • Product Schema                                         │  │
│  │  • Order Schema                                           │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ Mongoose ODM
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│                    DATABASE (MongoDB)                            │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │              │  │              │  │              │         │
│  │    users     │  │   products   │  │    orders    │         │
│  │  Collection  │  │  Collection  │  │  Collection  │         │
│  │              │  │              │  │              │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                   │
│  • User credentials (hashed)                                     │
│  • Shopping carts                                                │
│  • Product catalog with images                                   │
│  • Order history & tracking                                      │
└───────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### User Registration Flow
```
User → signup.html → auth.js → POST /api/auth/signup
                                      ↓
                              Validate Input
                                      ↓
                              Hash Password (bcrypt)
                                      ↓
                              Save to MongoDB
                                      ↓
                              Generate JWT Token
                                      ↓
                              Return Token + User Data
                                      ↓
                              Store Token in localStorage
                                      ↓
                              Redirect to Login/Home
```

### Product Browse Flow
```
User → products.html → products.js → GET /api/products?category=electronics
                                            ↓
                                    Apply Filters & Sort
                                            ↓
                                    Query MongoDB
                                            ↓
                                    Return Products Array
                                            ↓
                                    Display in UI
```

### Add to Cart Flow
```
User Clicks "Add to Cart" → addToCart(productId)
                                    ↓
                            Check Authentication (JWT)
                                    ↓
                            POST /api/cart
                            { productId, quantity }
                                    ↓
                            Verify Stock Availability
                                    ↓
                            Update User's Cart in MongoDB
                                    ↓
                            Return Updated Cart
                                    ↓
                            Update Cart Badge UI
                                    ↓
                            Show Success Notification
```

### Checkout Flow
```
User → Cart → Checkout Button
        ↓
    Enter Shipping Info
        ↓
    Select Payment Method
        ↓
    POST /api/orders
    { items, address, payment }
        ↓
    Validate Stock
        ↓
    Create Order in MongoDB
        ↓
    Update Product Stock
        ↓
    Clear User's Cart
        ↓
    Generate Order Number
        ↓
    Return Order Confirmation
        ↓
    Display Success Page
```

---

## 🔐 Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      Login Process                           │
└─────────────────────────────────────────────────────────────┘

1. User enters email & password
         ↓
2. Frontend sends POST /api/auth/login
         ↓
3. Backend finds user by email
         ↓
4. Compare password with bcrypt hash
         ↓
5. If valid → Generate JWT Token
         ↓
6. Send token in response + cookie
         ↓
7. Frontend stores token in localStorage
         ↓
8. Token included in all future requests
         ↓
9. Backend verifies token on protected routes
         ↓
10. Allow/Deny access based on token validity

┌─────────────────────────────────────────────────────────────┐
│                  Protected Route Access                      │
└─────────────────────────────────────────────────────────────┘

Request → Middleware checks Authorization header
                ↓
        Token present?
                ↓
        ┌───────┴────────┐
        NO              YES
        ↓                ↓
    Return 401      Verify Token
    Unauthorized    with JWT Secret
                        ↓
                    Valid?
                        ↓
                ┌───────┴────────┐
               NO              YES
                ↓                ↓
            Return 401      Proceed to Route
            Invalid Token   Execute Logic
```

---

## 📦 Database Schema Relationships

```
┌──────────────────┐
│      User        │
│──────────────────│
│ _id              │◄─────────┐
│ name             │          │
│ email            │          │
│ password (hash)  │          │
│ role             │          │
│ cart []          │──┐       │
│ wishlist []      │──┤       │
│ orders []        │──┤       │
│ address []       │  │       │
└──────────────────┘  │       │
                      │       │
        ┌─────────────┘       │
        │                     │
        ▼                     │
┌──────────────────┐          │
│     Product      │          │
│──────────────────│          │
│ _id              │◄─────┐   │
│ name             │      │   │
│ description      │      │   │
│ price            │      │   │
│ category         │      │   │
│ images []        │      │   │
│ stock            │      │   │
│ rating           │      │   │
│ reviews []       │──┐   │   │
│ isFeatured       │  │   │   │
└──────────────────┘  │   │   │
                      │   │   │
        ┌─────────────┘   │   │
        │                 │   │
        ▼                 │   │
┌──────────────────┐      │   │
│     Review       │      │   │
│──────────────────│      │   │
│ user (ref)       │──────┘   │
│ rating           │          │
│ comment          │          │
│ createdAt        │          │
└──────────────────┘          │
                              │
        ┌─────────────────────┘
        │
        ▼
┌──────────────────┐
│      Order       │
│──────────────────│
│ _id              │
│ user (ref)       │──────────┘
│ orderNumber      │
│ items []         │──┐
│   - product (ref)│  │ References Product
│   - quantity     │──┘
│   - price        │
│ shippingAddress  │
│ paymentMethod    │
│ totalAmount      │
│ orderStatus      │
│ isPaid           │
│ isDelivered      │
│ trackingNumber   │
└──────────────────┘
```

---

## 🛠️ Technology Stack Details

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                        │
├─────────────────────────────────────────────────────────┤
│ • HTML5                  - Structure                     │
│ • CSS3                   - Styling                       │
│ • Vanilla JavaScript     - Interactivity                │
│ • Fetch API              - HTTP Requests                │
│ • LocalStorage           - Token Storage                │
│ • Font Awesome           - Icons                         │
└─────────────────────────────────────────────────────────┘
                            ↕ HTTP/HTTPS
┌─────────────────────────────────────────────────────────┐
│                    BACKEND LAYER                         │
├─────────────────────────────────────────────────────────┤
│ • Node.js v14+           - Runtime                       │
│ • Express.js v4          - Web Framework                │
│ • Mongoose v8            - MongoDB ODM                   │
│ • jsonwebtoken           - JWT Auth                      │
│ • bcryptjs               - Password Hashing              │
│ • express-validator      - Input Validation             │
│ • cors                   - Cross-Origin Requests         │
│ • dotenv                 - Environment Config            │
│ • cookie-parser          - Cookie Handling              │
└─────────────────────────────────────────────────────────┘
                            ↕ Mongoose
┌─────────────────────────────────────────────────────────┐
│                   DATABASE LAYER                         │
├─────────────────────────────────────────────────────────┤
│ • MongoDB v4.4+          - NoSQL Database               │
│   - Collections:         users, products, orders         │
│   - Indexes:             Text search, Category, Price    │
│   - Aggregations:        Statistics, Reporting           │
└─────────────────────────────────────────────────────────┘
```

---

## 🔒 Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   SECURITY LAYERS                        │
└─────────────────────────────────────────────────────────┘

Layer 1: Transport Security
─────────────────────────────
• HTTPS (in production)
• Secure Cookies (httpOnly, secure)
• CORS Configuration

Layer 2: Authentication
─────────────────────────────
• JWT Tokens (7-day expiry)
• Token in Authorization Header
• Token Verification Middleware

Layer 3: Authorization
─────────────────────────────
• Role-Based Access Control
• User vs Admin Routes
• Resource Ownership Checks

Layer 4: Data Protection
─────────────────────────────
• bcrypt Password Hashing (10 rounds)
• No Sensitive Data in Responses
• Password Field Excluded by Default

Layer 5: Input Validation
─────────────────────────────
• express-validator
• Email Format Validation
• Password Strength Requirements
• SQL/NoSQL Injection Prevention

Layer 6: Error Handling
─────────────────────────────
• No Stack Traces in Production
• Generic Error Messages
• Proper HTTP Status Codes
```

---

## 📈 Scalability Considerations

```
Current Architecture:
    Frontend (Static)
         ↓
    Single Backend Server
         ↓
    MongoDB (Single Instance)

Scaling Path:
    Frontend (CDN + Static Hosting)
         ↓
    Load Balancer
         ↓
    Multiple Backend Servers (Horizontal Scaling)
         ↓
    MongoDB Replica Set (High Availability)
         ↓
    Redis Cache (Session Storage)
         ↓
    Elasticsearch (Advanced Search)
```

---

## 🚀 Deployment Architecture

```
Development:
    localhost:5500 (Frontend)
         ↓
    localhost:5000 (Backend API)
         ↓
    localhost:27017 (MongoDB)

Production:
    yourdomain.com (Frontend - Vercel/Netlify)
         ↓
    api.yourdomain.com (Backend - Heroku/Railway)
         ↓
    MongoDB Atlas (Cloud Database)

Recommended Stack:
• Frontend: Vercel, Netlify, GitHub Pages
• Backend: Heroku, Railway, Render, DigitalOcean
• Database: MongoDB Atlas (Free 512MB)
• CDN: Cloudflare
• Monitoring: New Relic, Datadog
```

---

## 📊 Performance Optimizations

```
Database:
✓ Indexes on frequently queried fields
✓ Text search indexes
✓ Lean queries (plain JS objects)
✓ Select only needed fields
✓ Pagination (12 items per page)

Backend:
✓ Efficient route handlers
✓ Proper error handling
✓ Minimal middleware stack
✓ Response compression (can add)
✓ Rate limiting (can add)

Frontend:
✓ Debounced search (300ms)
✓ Lazy loading images
✓ Minimal DOM manipulation
✓ Cached API responses (can add)
✓ Service Workers (can add)
```

---

This architecture provides:
✅ Separation of Concerns
✅ Scalability
✅ Security
✅ Maintainability
✅ Production-Ready Design

**Modern, Professional eCommerce Architecture! 🏗️✨**
