# 🫖 Graduate Chai - Complete Project Setup Guide

## 📁 Project Structure

```
Graduate_22/
├── src/
│   ├── app/
│   │   ├── admin/                    # Next.js Admin Panel
│   │   │   ├── layout.tsx           # Admin layout with auth
│   │   │   ├── page.tsx             # Dashboard
│   │   │   ├── login/
│   │   │   │   └── page.tsx         # Admin login
│   │   │   ├── products/
│   │   │   │   ├── page.tsx         # Products list
│   │   │   │   └── new/
│   │   │   │       └── page.tsx     # Add new product
│   │   │   └── orders/
│   │   │       └── page.tsx         # Orders management
│   │   └── api/                     # Next.js API routes (proxy to backend)
│   ├── components/
│   │   └── sections/
│   │       └── Products.tsx         # Dynamic products component
│   └── ...
├── backend/                         # Node.js Backend
│   ├── config/
│   │   └── database.js             # MySQL connection
│   ├── middleware/
│   │   └── auth.js                 # JWT authentication
│   ├── routes/
│   │   ├── auth.js                 # Admin login routes
│   │   └── products.js             # Product CRUD routes
│   ├── public/
│   │   └── admin.html              # Legacy HTML admin (not used)
│   ├── server.js                   # Main server file
│   ├── package.json                # Backend dependencies
│   ├── .env.example                # Environment template
│   └── README.md                   # Backend documentation
└── ...
```

## 🚀 Setup Instructions

### 1. Database Setup (MySQL)

Your database `chai_admin_db` is already set up with:
- ✅ `admins` table with admin user
- ✅ `orders` table 
- ✅ `products` table (auto-created by backend)

**Admin Credentials:**
- Email: `admin@chaiwala.com`
- Password: `admin123`

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
copy .env.example .env

# Update .env with your database credentials:
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=root
# DB_NAME=chai_admin_db

# Start backend server
npm start
```

Backend will run on: `http://localhost:5000`

### 3. Frontend Setup (Next.js)

```bash
# Navigate to project root
cd ..

# Install dependencies (if not already done)
npm install

# Start Next.js development server
npm run dev
```

Frontend will run on: `http://localhost:3000`

## 🔗 API Integration

### Backend API Endpoints

**Authentication:**
- `POST /api/auth/login` - Admin login
- `GET /api/auth/profile` - Get admin profile

**Products:**
- `GET /api/products` - Get all active products (public)
- `GET /api/products/admin/all` - Get all products (admin)
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Frontend API Calls

Your React components now fetch data from:
```javascript
// Public products for main website
fetch('/api/products')

// Admin products (requires auth token)
fetch('/api/products/admin/all', {
  headers: { 'Authorization': `Bearer ${token}` }
})
```

## 🎯 Usage Flow

### For Customers (Main Website)
1. Visit `http://localhost:3000`
2. View products (now loaded dynamically from database)
3. Products automatically update when admin makes changes

### For Admin (Product Management)
1. Visit `http://localhost:3000/admin`
2. Login with: `admin@chaiwala.com` / `admin123`
3. Manage products through beautiful Next.js interface:
   - **Dashboard**: View stats and recent activity
   - **Products**: List, add, edit, delete products
   - **Orders**: View customer orders (mock data)

## 🔧 Key Features

### ✅ Dynamic Product System
- Products loaded from MySQL database
- Real-time updates between admin and customer views
- Fallback to static data if API fails

### ✅ Next.js Admin Panel
- Beautiful, responsive React components
- JWT authentication with auto-redirect
- Form validation and error handling
- Real-time product management

### ✅ Secure Backend API
- MySQL database integration
- JWT authentication
- Input validation
- CORS and security headers
- Rate limiting

### ✅ Professional UI/UX
- Consistent Graduate Chai branding
- Loading states and error handling
- Mobile-responsive design
- Smooth animations and transitions

## 🚦 Running the Complete System

### Terminal 1 - Backend
```bash
cd backend
npm start
```

### Terminal 2 - Frontend
```bash
npm run dev
```

### Access Points
- **Main Website**: `http://localhost:3000`
- **Admin Panel**: `http://localhost:3000/admin`
- **Backend API**: `http://localhost:5000/api`

## 🔄 Development Workflow

1. **Add New Product**: Use admin panel at `/admin/products/new`
2. **View Changes**: Products appear immediately on main website
3. **Edit Products**: Use admin panel products list
4. **Monitor**: Check dashboard for stats and activity

## 🛠️ Customization

### Adding New Product Fields
1. Update database schema in `backend/config/database.js`
2. Update API routes in `backend/routes/products.js`
3. Update React components in admin panel
4. Update main Products component

### Styling Changes
- Admin panel: Update Tailwind classes in admin components
- Main website: Update existing component styles

## 📝 Notes

- Admin authentication persists in localStorage
- Products have fallback static data for reliability
- All forms include validation and error handling
- Database tables are auto-created on first run
- CORS configured for local development

## 🎉 You're All Set!

Your Graduate Chai website now has:
- ✅ Dynamic product management
- ✅ Professional admin panel in Next.js
- ✅ Secure backend API
- ✅ Database integration
- ✅ Beautiful, responsive UI

Start both servers and visit the admin panel to begin managing your products!
