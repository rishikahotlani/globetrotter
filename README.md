# 🌍 Travel Globetrotter

A full-stack travel planning application built with Next.js, Node.js, Express, and MongoDB Atlas.

## ✨ Features

- **Trip Planning**: Create, manage, and visualize your dream vacations
- **City Discovery**: Explore cities with cost information, highlights, and travel tips
- **Activity Search**: Find activities by type, cost, duration, and location
- **Budget Management**: Track trip expenses and manage your travel budget
- **Itinerary Builder**: Plan day-by-day activities and city visits
- **Real-time Data**: Full MongoDB Atlas integration with persistent storage

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

**Windows:**
```bash
quick-start.bat
```

**Mac/Linux:**
```bash
chmod +x quick-start.sh
./quick-start.sh
```

### Option 2: Manual Setup

1. **Set up MongoDB Atlas** (see `setup-complete-app.md`)
2. **Create backend `.env` file** (see `backend/env-template.txt`)
3. **Install dependencies:**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
4. **Start the application:**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev
   
   # Terminal 2 - Frontend  
   cd frontend && npm run dev
   ```

## 📁 Project Structure

```
travel_globetrotter/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── models/         # MongoDB schemas
│   │   ├── controllers/    # API logic
│   │   ├── routes/         # API endpoints
│   │   ├── config/         # Database config
│   │   └── seed/           # Sample data
│   ├── .env                # Environment variables
│   └── package.json
├── frontend/                # Next.js 14 application
│   ├── app/                # App Router pages
│   ├── components/         # React components
│   └── package.json
├── setup-complete-app.md    # Detailed setup guide
├── quick-start.bat          # Windows quick start
├── quick-start.sh           # Mac/Linux quick start
└── verify-setup.js          # Setup verification
```

## 🔧 Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **Zod** - Data validation
- **CORS** - Cross-origin resource sharing

### Frontend
- **Next.js 14** - React framework with App Router
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Responsive Design** - Mobile-first approach

## 📱 Application Features

### Dashboard
- Quick trip planning
- Popular destinations
- Recent trips overview

### Trip Management
- Create new trips with dates and budget
- Add multiple cities and activities
- Track trip status and progress

### City Discovery
- Search cities by name, region, or cost
- View city highlights and travel information
- Filter by cost level and region

### Activity Discovery
- Browse activities by type and location
- Filter by cost, duration, and difficulty
- View activity details and requirements

### Itinerary Builder
- Plan day-by-day activities
- Organize activities by city
- Budget tracking and cost breakdown

## 🗄️ Database Models

### User
- Profile information and preferences
- Travel style and favorite destinations
- Secure password authentication

### Trip
- Trip details and planning information
- Cities and activities
- Budget and status tracking

### City
- City information and highlights
- Cost levels and travel tips
- Geographic and cultural details

### Activity
- Activity descriptions and requirements
- Cost, duration, and difficulty
- Location and booking information

## 🌐 API Endpoints

- `GET /api/health` - API status
- `GET /api/cities` - List cities with filtering
- `GET /api/activities` - List activities with filtering
- `GET /api/trips` - List user trips
- `POST /api/trips` - Create new trip
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User authentication

## 🚀 Getting Started

1. **Clone the repository**
2. **Set up MongoDB Atlas** (free tier available)
3. **Configure environment variables**
4. **Install dependencies**
5. **Seed the database**
6. **Start both servers**

## 📚 Documentation

- **`setup-complete-app.md`** - Comprehensive setup guide
- **`backend/README.md`** - Backend-specific documentation
- **`backend/setup-mongodb.md`** - MongoDB Atlas setup guide

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm run test:models    # Test MongoDB connection
npm run test:api       # Test all API endpoints
```

### Frontend Testing
Visit `http://localhost:3000` to test the complete application

## 🔒 Environment Variables

### Backend (.env)
```env
PORT=4000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travel_globetrotter?retryWrites=true&w=majority
NODE_ENV=development
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

## 🚀 Deployment

### Frontend
- Deploy to Vercel, Netlify, or any static hosting
- Update `NEXT_PUBLIC_BACKEND_URL` to production backend

### Backend
- Deploy to Railway, Heroku, or any Node.js hosting
- Update MongoDB Atlas network access for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter issues:
1. Check the console for error messages
2. Verify environment variables are set correctly
3. Ensure both servers are running
4. Check MongoDB Atlas connection and permissions
5. Review the setup documentation

## 🎯 Roadmap

- [ ] User authentication with JWT
- [ ] Trip sharing and collaboration
- [ ] Reviews and ratings system
- [ ] Advanced search and filtering
- [ ] Mobile app development
- [ ] Social features and recommendations

---

**Happy Traveling! ✈️🌍**
