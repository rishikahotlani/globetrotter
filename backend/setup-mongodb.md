# MongoDB Atlas Setup Guide

This guide will help you set up MongoDB Atlas for your Travel Globetrotter application.

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click "Try Free" or "Sign Up"
3. Fill in your details and create an account
4. Verify your email address

## Step 2: Create a Cluster

1. After logging in, click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region close to you
5. Click "Create"

## Step 3: Set Up Database Access

1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and password (save these!)
5. Under "Database User Privileges", select "Read and write to any database"
6. Click "Add User"

## Step 4: Set Up Network Access

1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## Step 5: Get Connection String

1. Go back to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string

## Step 6: Configure Your Application

1. Create a `.env` file in your backend directory
2. Add your MongoDB URI:

```env
PORT=4000
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/travel_globetrotter?retryWrites=true&w=majority
NODE_ENV=development
```

**Important**: 
- Replace `your_username` with the username you created in Step 3
- Replace `your_password` with the password you created in Step 3
- Replace `your_cluster` with your actual cluster name
- The `travel_globetrotter` part is your database name

## Step 7: Test Connection

1. Run the test script:
```bash
npm run test:models
```

2. If successful, you should see:
```
✅ MongoDB connection successful!
✅ All models imported successfully!
```

## Step 8: Seed the Database

1. Populate your database with sample data:
```bash
npm run seed
```

2. You should see confirmation of data insertion:
```
Inserted 5 cities
Inserted 5 activities
Inserted 2 users
Database seeded successfully!
```

## Step 9: Start Your Application

1. Start the development server:
```bash
npm run dev
```

2. Your API should now be running with full MongoDB integration!

## Troubleshooting

### Connection Error
- Check your username and password in the connection string
- Ensure your IP address is whitelisted in Network Access
- Verify the cluster name is correct

### Authentication Error
- Make sure your database user has the correct permissions
- Check that the username and password match exactly

### Network Error
- Ensure your IP address is added to the Network Access whitelist
- Try adding 0.0.0.0/0 for development (allows access from anywhere)

## Security Notes

- Never commit your `.env` file to version control
- Use strong passwords for your database users
- In production, restrict network access to specific IP addresses
- Consider using environment-specific connection strings

## Next Steps

Once your MongoDB Atlas is set up and working:

1. Test your API endpoints using tools like Postman or curl
2. Create a frontend application to interact with your API
3. Implement user authentication with JWT tokens
4. Add more features like trip sharing, reviews, and ratings
