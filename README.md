# FormBuilder - Complete MERN Application

## 🎯 Project Overview

A Google Forms-like application built with MERN stack (MongoDB, Express, React, Node.js).

**Status**: ✅ Frontend Complete | ✅ Backend Complete | ⏳ Ready for Integration

---

## 📁 Project Structure

```
FormBuilderr/
├── frontend/                    # React + Vite (COMPLETE ✅)
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Application pages
│   │   ├── routes/             # Routing logic
│   │   ├── services/           # API integration (needs backend URL)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                     # Node.js + Express + MongoDB (COMPLETE ✅)
│   ├── models/                 # Database schemas
│   ├── controllers/            # Business logic
│   ├── routes/                 # API endpoints
│   ├── middleware/             # Authentication & errors
│   ├── config/                 # Database configuration
│   ├── server.js               # Main server
│   ├── package.json
│   ├── .env                    # Configuration
│   └── Documentation/          # 8 detailed guides
│
└── START_HERE.md               # Quick start guide
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v14+)
- MongoDB (running locally or MongoDB Atlas)
- Git (optional)

### Step 1: Start Backend (5 minutes)

```bash
cd backend
npm install
npm run dev
```

You should see:

```
MongoDB Connected: localhost
Server is running on port 5000
```

### Step 2: Start Frontend (in another terminal)

```bash
cd frontend
npm run dev
```

You should see:

```
Local:   http://localhost:5173/
```

### Step 3: Test the Application

- Open http://localhost:5173
- Navigate to /login
- Test the application flow

---

## 📚 Documentation

### For Developers

**Backend Documentation** (read in this order):

1. [backend/START_HERE.md](backend/START_HERE.md) ← Start here!
2. [backend/QUICKSTART.md](backend/QUICKSTART.md) ← 5-minute setup
3. [backend/README.md](backend/README.md) ← Complete reference
4. [backend/SETUP.md](backend/SETUP.md) ← Detailed setup
5. [backend/ARCHITECTURE.md](backend/ARCHITECTURE.md) ← System design

**Frontend Code** (already complete):

- Components: `frontend/src/components/`
- Pages: `frontend/src/pages/`
- API Service: `frontend/src/services/api.js` (update this for backend)

---

## ✨ Features

### ✅ Admin Features

- Register/Login with JWT authentication
- Create forms with multiple field types
- Manage form fields (add/remove)
- Live preview of forms
- View all created forms
- Track form responses
- See submission details
- User Dashboard (view available forms)

### ✅ User Features

- View available forms
- Fill and submit forms
- Enter user ID and name
- Submit responses publicly (no login needed)
- Access forms via shareable URL

### ✅ Supported Field Types

- Text Input
- Email
- Number
- Text Area
- Single Checkbox
- Checkbox Group (multiple select)
- Radio Buttons
- Dropdown

---

## 🔧 Technologies

### Frontend

- React 19.2
- Vite (build tool)
- Tailwind CSS (styling)
- lucide-react (icons)
- react-router-dom (routing)

### Backend

- Node.js + Express (server)
- MongoDB + Mongoose (database)
- JWT (authentication)
- bcryptjs (password hashing)
- CORS (cross-origin requests)

---

## 📊 API Endpoints (13 total)

### Authentication

```
POST   /api/auth/register     → Register admin
POST   /api/auth/login        → Admin login (returns token)
GET    /api/auth/profile      → Get admin profile (protected)
```

### Forms

```
POST   /api/forms             → Create form (admin only)
GET    /api/forms             → Get all forms (admin only)
GET    /api/forms/:id         → Get form by ID (public)
PUT    /api/forms/:id         → Update form (admin only)
DELETE /api/forms/:id         → Delete form (admin only)
```

### Responses

```
POST   /api/responses         → Submit response (public)
GET    /api/responses/:id     → Get responses (admin only)
GET    /api/responses/count   → Get response count
GET    /api/health            → Health check
```

---

## 🔐 Authentication Flow

```
1. Admin logs in → /api/auth/login
2. Backend returns JWT token
3. Frontend saves token in localStorage
4. For protected routes, send: Authorization: Bearer <token>
5. Backend validates token before processing
```

---

## 🧪 Testing

### Test Backend with Postman

1. Import `backend/postman_collection.json` into Postman
2. Replace `YOUR_TOKEN_HERE` with actual token after login
3. Replace `FORM_ID_HERE` with actual form IDs
4. Test all endpoints

### Test with curl

```bash
# Health check
curl http://localhost:5000/api/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@email.com","password":"password123"}'
```

---

## 🔗 Integration Checklist

- [ ] Backend server running (`npm run dev`)
- [ ] MongoDB connected
- [ ] Frontend running (`npm run dev`)
- [ ] Update `frontend/src/services/api.js` baseURL
- [ ] Test admin login flow
- [ ] Test form creation
- [ ] Test form submission
- [ ] Test response viewing

---

## 🚀 Deployment

### Deployment Platforms Supported

- Heroku (free tier ended)
- AWS (EC2, Lambda)
- Azure
- Google Cloud
- DigitalOcean
- Railway
- Render

See `backend/ARCHITECTURE.md` for deployment checklist.

---

## 📖 Documentation Files

### Backend (7 guides)

- `README.md` - Complete API documentation
- `SETUP.md` - Detailed setup instructions
- `QUICKSTART.md` - 5-minute quick start
- `CHECKLIST.md` - Installation verification
- `ARCHITECTURE.md` - System design and flows
- `SUMMARY.md` - Quick overview
- `COMPLETE.md` - Completion summary

### Root

- `START_HERE.md` - Getting started guide

---

## 💡 Common Tasks

### Create a Form

1. Admin logs in
2. Goes to "Create Form"
3. Adds form title
4. Adds fields (text, email, dropdown, etc.)
5. Clicks "Save Form"

### Fill a Form

1. User visits `/form/FORM_ID`
2. Enters User ID and Name
3. Fills form fields
4. Clicks "Submit Form"

### View Responses

1. Admin logs in
2. Goes to Dashboard
3. Clicks "View Responses" on form
4. Sees all user submissions

---

## 🐛 Troubleshooting

### Backend won't start

```
✓ Check MongoDB is running
✓ Check PORT 5000 is free
✓ Run: npm install (again)
```

### MongoDB connection error

```
✓ Check MongoDB service is running
✓ Check connection string in .env
✓ Verify MongoDB port (27017)
```

### Frontend won't connect to backend

```
✓ Check backend is running on 5000
✓ Update baseURL in api.js
✓ Check CORS is enabled
```

### CORS errors

```
✓ CORS is already enabled in backend
✓ Check frontend URL matches
✓ Verify request headers
```

---

## 📚 Learning Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [React Docs](https://react.dev/)
- [JWT.io](https://jwt.io/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🎯 Next Steps

### 1. Get Backend Running (Start Here!)

```bash
cd backend
npm install
npm run dev
```

See: `backend/QUICKSTART.md`

### 2. Connect Frontend to Backend

Update `frontend/src/services/api.js`:

```javascript
baseURL: "http://localhost:5000/api";
```

### 3. Test Complete Flow

- Login with admin credentials
- Create a test form
- Submit a test response
- View the response

### 4. Customize & Deploy

- Add your own styling
- Add more features
- Deploy to production
- Share with users

---

## 📝 Notes

### Current Status

- ✅ Frontend: 100% complete with mock API
- ✅ Backend: 100% complete with real database
- ⏳ Integration: Ready to connect

### What's Working

- ✅ Admin authentication
- ✅ Form creation with multiple field types
- ✅ Form responses submission
- ✅ Response viewing by admin
- ✅ User dashboard

### What's Next

- Integrate frontend with backend
- Add input validation
- Add error handling UI
- Deploy to production

---

## 💬 Support

### For Help

1. Check documentation in `/backend` folder
2. Start with `backend/START_HERE.md`
3. Check `backend/QUICKSTART.md` for quick answers
4. Check terminal logs for errors
5. Read `backend/CHECKLIST.md` for troubleshooting

### Common Questions

- **How to start?** → `backend/QUICKSTART.md`
- **How to setup?** → `backend/SETUP.md`
- **How to test APIs?** → `backend/postman_collection.json`
- **How to deploy?** → `backend/ARCHITECTURE.md`

---

## 🎉 Ready to Build?

### Start Backend

```bash
cd backend && npm install && npm run dev
```

### Start Frontend (in new terminal)

```bash
cd frontend && npm run dev
```

### Open Application

```
http://localhost:5173
```

---

**Happy Building!** 🚀

For detailed setup → See `backend/START_HERE.md`
