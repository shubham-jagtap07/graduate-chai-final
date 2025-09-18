# Inquiries System Setup

## 🎯 What's Been Implemented

I've successfully added a complete **Inquiries Management System** to your Graduate Chai admin panel that captures and manages both popup form submissions and contact page inquiries.

## 📋 Features Added

### 1. **Backend API** (`c:\chai\gtbackend\routes\inquiries.js`)
- ✅ **GET /api/inquiries** - Fetch all inquiries (admin only)
- ✅ **POST /api/inquiries** - Create new inquiry (public)
- ✅ **PUT /api/inquiries/:id/status** - Update inquiry status (admin only)
- ✅ **DELETE /api/inquiries/:id** - Delete inquiry (admin only)

### 2. **Database Table** (`inquiries`)
- ✅ Stores: name, phone, email, city, subject, message, source, status
- ✅ Status tracking: new → contacted → resolved → closed
- ✅ Source tracking: popup vs contact page
- ✅ Automatic timestamps (created_at, updated_at)

### 3. **Frontend Integration**
- ✅ **Popup Form** (`PopupForm.tsx`) - Now sends data to backend
- ✅ **Contact Page** (`contact/page.tsx`) - Now sends data to backend
- ✅ **Admin Navigation** - Added "Inquiries" tab
- ✅ **Admin Dashboard** - Shows inquiry statistics
- ✅ **Inquiries Management Page** - Full CRUD interface

### 4. **Admin Panel Features**
- ✅ **Dashboard Stats** - Total inquiries, new inquiries count
- ✅ **Inquiries List** - Sortable table with filters
- ✅ **Status Management** - Update inquiry status
- ✅ **Detailed View** - Modal with full inquiry details
- ✅ **Contact Actions** - Click to call/email directly
- ✅ **Delete Function** - Remove unwanted inquiries

## 🚀 Setup Instructions

### Step 1: Database Setup
Run this command in your backend directory to create the inquiries table:

```bash
cd c:\chai\gtbackend
node setup-inquiries.js
```

This will:
- Create the `inquiries` table with proper schema
- Add indexes for performance
- Insert sample data for testing

### Step 2: Restart Backend Server
```bash
cd c:\chai\gtbackend
npm start
# or
node server.js
```

### Step 3: Restart Frontend Server
```bash
cd c:\chai\graduate-chai-final
npm run dev
```

## 📊 How It Works

### Customer Journey:
1. **Customer fills popup form** → Data saved as "popup" source
2. **Customer fills contact page** → Data saved as "contact" source
3. **Admin gets notification** → New inquiry appears in dashboard
4. **Admin manages inquiry** → Update status, view details, contact customer

### Admin Workflow:
1. **Dashboard Overview** → See total and new inquiries at a glance
2. **Inquiries Page** → `/admin/inquiries` - Full management interface
3. **Filter & Sort** → Filter by status (new, contacted, resolved, closed)
4. **View Details** → Click any inquiry to see full details
5. **Update Status** → Track progress from new → resolved
6. **Contact Customer** → Click phone/email for direct contact

## 🎨 UI Features

### Dashboard:
- 📊 **Stats Cards** - Total inquiries, new inquiries
- 🚀 **Quick Action** - Direct link to inquiries page

### Inquiries Page:
- 📋 **Data Table** - All inquiries with key info
- 🔍 **Status Filter** - Filter by inquiry status
- 📱 **Responsive Design** - Works on all devices
- 🎯 **Status Badges** - Color-coded status indicators
- 📞 **Contact Links** - Click-to-call and email
- 🗑️ **Delete Function** - Remove spam/unwanted inquiries

### Inquiry Detail Modal:
- 📝 **Full Information** - All customer details
- 🔄 **Status Update** - Dropdown to change status
- 📅 **Timestamps** - Created and updated dates
- 🏷️ **Source Badge** - Shows popup vs contact origin

## 🔧 Technical Details

### Database Schema:
```sql
CREATE TABLE inquiries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    city VARCHAR(255),
    subject VARCHAR(500),
    message TEXT,
    source VARCHAR(20) DEFAULT 'popup',
    status VARCHAR(20) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### API Endpoints:
- **Public**: `POST /api/backend/inquiries` - Anyone can submit
- **Admin**: `GET /api/backend/inquiries` - Requires authentication
- **Admin**: `PUT /api/backend/inquiries/:id/status` - Update status
- **Admin**: `DELETE /api/backend/inquiries/:id` - Delete inquiry

### Security:
- ✅ Admin endpoints require JWT authentication
- ✅ Input validation on all fields
- ✅ SQL injection protection
- ✅ Rate limiting on API calls

## 📱 Testing

### Test the Popup Form:
1. Visit your website homepage
2. The popup should appear automatically
3. Fill in phone number (required)
4. Submit → Check admin panel

### Test the Contact Page:
1. Visit `/contact`
2. Fill the contact form
3. Submit → Check admin panel

### Test Admin Panel:
1. Login to `/admin/login`
2. Check dashboard for inquiry stats
3. Click "Inquiries" tab
4. View, update, and manage inquiries

## 🎯 Next Steps

The inquiries system is now fully functional! You can:

1. **Monitor Customer Interest** - Track all inquiries in one place
2. **Improve Response Time** - See new inquiries immediately
3. **Follow Up Systematically** - Use status tracking
4. **Analyze Trends** - See which source generates more inquiries
5. **Scale Customer Support** - Organized inquiry management

## 🔍 Troubleshooting

### If inquiries aren't saving:
- Check browser console for errors
- Verify backend server is running
- Check database connection
- Ensure inquiries table exists

### If admin page shows errors:
- Verify you're logged in as admin
- Check JWT token is valid
- Ensure backend API is accessible

### If database errors occur:
- Run the setup script: `node setup-inquiries.js`
- Check PostgreSQL connection
- Verify table permissions

---

**🎉 Your inquiries system is ready!** Customers can now submit inquiries through both the popup and contact forms, and you can manage them all from your admin panel.
