#!/bin/bash

echo "🚀 Travel Globetrotter Quick Start Script"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Backend setup
echo "🔧 Setting up Backend..."
cd backend

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Please create it with your MongoDB Atlas credentials."
    echo "   See env-template.txt for the required format."
    echo ""
    echo "   Required content:"
    echo "   PORT=4000"
    echo "   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travel_globetrotter?retryWrites=true&w=majority"
    echo "   NODE_ENV=development"
    echo ""
    echo "   After creating .env, run this script again."
    exit 1
fi

echo "✅ .env file found"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install

# Test MongoDB connection
echo "🔍 Testing MongoDB connection..."
npm run test:models

# Seed database
echo "🌱 Seeding database..."
npm run seed

# Start backend in background
echo "🚀 Starting backend server..."
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 5

# Test backend health
if curl -s http://localhost:4000/api/health > /dev/null; then
    echo "✅ Backend is running on http://localhost:4000"
else
    echo "❌ Backend failed to start"
    exit 1
fi

echo ""

# Frontend setup
echo "🔧 Setting up Frontend..."
cd ../frontend

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Start frontend in background
echo "🚀 Starting frontend server..."
npm run dev &
FRONTEND_PID=$!

# Wait for frontend to start
echo "⏳ Waiting for frontend to start..."
sleep 5

# Test frontend
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend is running on http://localhost:3000"
else
    echo "❌ Frontend failed to start"
    exit 1
fi

echo ""
echo "🎉 Travel Globetrotter is now running!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:4000"
echo "📊 MongoDB:  Check your MongoDB Atlas dashboard"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup background processes
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Keep script running
wait
