import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { sampleCities, sampleActivities, sampleUsers } from './seedData.js';
import City from '../models/City.js';
import Activity from '../models/Activity.js';
import User from '../models/User.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await City.deleteMany({});
    await Activity.deleteMany({});
    await User.deleteMany({});

    console.log('Cleared existing data');

    // Insert sample cities
    const cities = await City.insertMany(sampleCities);
    console.log(`Inserted ${cities.length} cities`);

    // Insert sample activities
    const activities = await Activity.insertMany(sampleActivities);
    console.log(`Inserted ${activities.length} activities`);

    // Insert sample users
    const users = await User.insertMany(sampleUsers);
    console.log(`Inserted ${users.length} users`);

    console.log('Database seeded successfully!');
    
    // Display some sample data
    console.log('\nSample Cities:');
    cities.forEach(city => {
      console.log(`- ${city.name}, ${city.country} (${city.costLevel})`);
    });

    console.log('\nSample Activities:');
    activities.forEach(activity => {
      console.log(`- ${activity.name} in ${activity.city} (${activity.type})`);
    });

    console.log('\nSample Users:');
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email})`);
    });

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the seed function
seedDatabase();
