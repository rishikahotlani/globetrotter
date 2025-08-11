# Complete Travel Globetrotter Setup Guide

This guide will help you set up the complete Travel Globetrotter application with frontend, backend, and MongoDB Atlas database.

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier available)
- Git (optional, for version control)

## Step 1: MongoDB Atlas Setup

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click "Try Free" or "Sign Up"
3. Fill in your details and create an account
4. Verify your email address

### 1.2 Create a Cluster
1. After logging in, click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region close to you
5. Click "Create"

### 1.3 Set Up Database Access
1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and password (save these!)
5. Under "Database User Privileges", select "Read and write to any database"
6. Click "Add User"

### 1.4 Set Up Network Access
1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 1.5 Get Connection String
1. Go back to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string

## Step 2: Backend Setup

### 2.1 Navigate to Backend Directory
```bash
cd backend
```

### 2.2 Create Environment File
Create a new file named `.env` in the backend directory with this content:

```env
PORT=4000
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/travel_globetrotter?retryWrites=true&w=majority
NODE_ENV=development
```

**Important**: Replace the placeholders with your actual MongoDB Atlas credentials.

### 2.3 Install Dependencies
```bash
npm install
```

### 2.4 Test MongoDB Connection
```bash
npm run test:models
```

You should see:
```
✅ MongoDB connection successful!
✅ All models imported successfully!
```

### 2.5 Seed the Database
```bash
npm run seed
```

You should see:
```
Inserted 5 cities
Inserted 5 activities
Inserted 2 users
Database seeded successfully!
```

### 2.6 Start Backend Server
```bash
npm run dev
```

The backend should start on `http://localhost:4000`

## Step 3: Frontend Setup

### 3.1 Open New Terminal and Navigate to Frontend
```bash
cd frontend
```

### 3.2 Install Dependencies
```bash
npm install
```

### 3.3 Start Frontend Development Server
```bash
npm run dev
```

The frontend should start on `http://localhost:3000`

## Step 4: Test Complete Application

### 4.1 Test Backend API
In a new terminal, from the backend directory:
```bash
npm run test:api
```

This will test all API endpoints and should show:
```
🧪 Testing Travel Globetrotter API...

1. Testing health endpoint...
   ✅ Health: 200 - Travel Globetrotter API is running

2. Testing cities endpoint...
   ✅ Cities: 200 - Found 5 cities

3. Testing activities endpoint...
   ✅ Activities: 200 - Found 5 activities

4. Testing trips endpoint...
   ✅ Trips: 200 - Found 0 trips

5. Testing user registration...
   ✅ User Registration: 201 - User ID: [some-id]

6. Testing user login...
   ✅ User Login: 200 - User ID: [some-id]

7. Testing trip creation...
   ✅ Trip Creation: 201 - Trip ID: [some-id]

🎉 API testing completed!
```

### 4.2 Test Frontend
1. Open your browser to `http://localhost:3000`
2. Navigate through the application:
   - Dashboard
   - City Discovery
   - Activity Discovery
   - Trip Creation
   - Trip Management

## Step 5: Verify Everything Works

### 5.1 Backend Health Check
Visit `http://localhost:4000/api/health` in your browser
Should show: `{"status":"OK","message":"Travel Globetrotter API is running"}`

### 5.2 Frontend API Integration
- Cities page should show real data from MongoDB
- Activities page should show real data from MongoDB
- Trip creation should save to MongoDB
- Trip listing should show real trips from MongoDB

### 5.3 Database Verification
You can verify data is being saved by:
1. Creating a new trip through the frontend
2. Checking the trips endpoint: `http://localhost:4000/api/trips`
3. Viewing the data in MongoDB Atlas dashboard

## Troubleshooting

### Backend Issues
- **MongoDB Connection Failed**: Check your `.env` file and MongoDB Atlas credentials
- **Port Already in Use**: Change PORT in `.env` file or kill existing process
- **Validation Errors**: Check that your data matches the schema requirements

### Frontend Issues
- **API Calls Failing**: Ensure backend is running on port 4000
- **CORS Errors**: Backend has CORS enabled, should work automatically
- **Build Errors**: Check Node.js version (18+ required)

### Database Issues
- **Connection String**: Ensure username, password, and cluster name are correct
- **Network Access**: Make sure your IP is whitelisted in MongoDB Atlas
- **User Permissions**: Ensure database user has read/write access

## Next Steps

Once everything is working:

1. **Customize Data**: Add more cities, activities, and sample data
2. **Enhance Features**: Add user authentication, trip sharing, reviews
3. **Deploy**: Deploy to platforms like Vercel (frontend) and Railway (backend)
4. **Scale**: Upgrade MongoDB Atlas cluster as needed

## File Structure

```
travel_globetrotter/
├── backend/
│   ├── src/
│   │   ├── models/          # MongoDB schemas
│   │   ├── controllers/     # API logic
│   │   ├── routes/          # API endpoints
│   │   ├── config/          # Database config
│   │   └── seed/            # Sample data
│   ├── .env                 # Environment variables
│   └── package.json
├── frontend/
│   ├── app/                 # Next.js pages
│   ├── components/          # React components
│   └── package.json
└── setup-complete-app.md    # This guide
```

## Support

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure both frontend and backend are running
4. Check MongoDB Atlas connection and permissions

Your Travel Globetrotter application should now be fully functional with real-time data persistence!
