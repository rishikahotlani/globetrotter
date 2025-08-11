# Travel Globetrotter Backend

A Node.js/Express backend for the Travel Globetrotter application with MongoDB Atlas integration.

## Features

- **User Management**: Registration, login (JWT), and user preferences
- **Trip Management**: Create, read, update, and delete trips (protected)
- **City Discovery**: Search and filter cities by region, cost, and more
- **Activity Discovery**: Browse activities by type, cost, duration, and location
- **MongoDB Integration**: Full database persistence with Mongoose ODM

## Prerequisites

- Node.js 18+ 
- MongoDB Atlas account (free tier available)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment

Create `.env`:

```env
PORT=4000
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/travel_globetrotter?retryWrites=true&w=majority
JWT_SECRET=your-very-strong-secret
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

### 3. Seed the Database

```bash
npm run seed
```

### 4. Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:4000`

## API Endpoints

### Health Check
- `GET /api/health` - API status

### Users
- `POST /api/users/register` - User registration (returns `{ user, token }`)
- `POST /api/users/login` - User login (returns `{ user, token }`)
- `GET /api/users/me` - Get current user (requires `Authorization: Bearer <token>`)

### Trips (Protected)
- `GET /api/trips` - List trips for current user
- `POST /api/trips` - Create a new trip for current user
- `GET /api/trips/:tripId` - Get a specific trip
- `PUT /api/trips/:tripId` - Update a trip
- `DELETE /api/trips/:tripId` - Delete a trip

### Cities
- `GET /api/cities` - List all cities (with filtering and pagination)
- `POST /api/cities` - Create a new city
- `GET /api/cities/:cityId` - Get a specific city
- `PUT /api/cities/:cityId` - Update a city
- `DELETE /api/cities/:cityId` - Delete a city

### Activities
- `GET /api/activities` - List all activities (with filtering and pagination)
- `POST /api/activities` - Create a new activity
- `GET /api/activities/:activityId` - Get a specific activity
- `PUT /api/activities/:activityId` - Update an activity
- `DELETE /api/activities/:activityId` - Delete an activity

## Auth Notes

- Include `Authorization: Bearer <token>` for protected endpoints
- Tokens expire in 7 days by default

## Data Models

### User
- Basic info (name, email, password)
- Travel preferences
- Favorite destinations
- Travel style (budget, moderate, luxury)

### Trip
- Title and description
- Start and end dates
- Budget
- Cities and activities
- Status (planning, active, completed, cancelled)

### City
- Name, country, region
- Cost level and average daily cost
- Highlights and tags
- Geographic coordinates
- Best time to visit

### Activity
- Name, type, description
- Location (city, country)
- Cost and duration
- Difficulty and rating
- Tags and requirements

## Environment Variables

- `PORT` - Server port (default: 4000)
- `MONGODB_URI` - MongoDB Atlas connection string
- `NODE_ENV` - Environment (development/production)

## Development

- `npm run dev` - Start development server with nodemon
- `npm run seed` - Populate database with sample data
- `npm start` - Start production server
