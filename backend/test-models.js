import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Test MongoDB connection and models
const testConnection = async () => {
  try {
    console.log('Testing MongoDB connection...');
    
    if (!process.env.MONGODB_URI) {
      console.log('❌ MONGODB_URI not found in environment variables');
      console.log('Please create a .env file with your MongoDB Atlas connection string');
      console.log('See config.example.js for details');
      return;
    }

    // Test connection
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connection successful!');
    
    // Test model imports
    try {
      const City = (await import('./src/models/City.js')).default;
      const Activity = (await import('./src/models/Activity.js')).default;
      const User = (await import('./src/models/User.js')).default;
      const Trip = (await import('./src/models/Trip.js')).default;
      
      console.log('✅ All models imported successfully!');
      console.log('✅ City model:', City.modelName);
      console.log('✅ Activity model:', Activity.modelName);
      console.log('✅ User model:', User.modelName);
      console.log('✅ Trip model:', Trip.modelName);
      
    } catch (modelError) {
      console.log('❌ Error importing models:', modelError.message);
    }

  } catch (error) {
    console.log('❌ MongoDB connection failed:', error.message);
    console.log('Please check your MONGODB_URI in the .env file');
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    }
  }
};

// Run the test
testConnection();
