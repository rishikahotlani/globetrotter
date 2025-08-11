import City from '../models/City.js';
import Activity from '../models/Activity.js';
import User from '../models/User.js';

export const sampleCities = [
  {
    name: 'Paris',
    country: 'France',
    region: 'Europe',
    description: 'The City of Light, known for its art, fashion, gastronomy and culture.',
    costLevel: 'luxury',
    averageDailyCost: 200,
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Champs-Élysées'],
    imageUrl: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800',
    coordinates: { latitude: 48.8566, longitude: 2.3522 },
    timezone: 'Europe/Paris',
    language: 'French',
    currency: 'EUR',
    bestTimeToVisit: { start: 'April', end: 'October' },
    tags: ['romance', 'culture', 'food', 'art', 'architecture']
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    region: 'Asia',
    description: 'A fascinating blend of ultramodern and traditional, offering a unique cultural experience.',
    costLevel: 'luxury',
    averageDailyCost: 180,
    highlights: ['Shibuya Crossing', 'Tokyo Tower', 'Senso-ji Temple', 'Tsukiji Fish Market'],
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    coordinates: { latitude: 35.6762, longitude: 139.6503 },
    timezone: 'Asia/Tokyo',
    language: 'Japanese',
    currency: 'JPY',
    bestTimeToVisit: { start: 'March', end: 'May' },
    tags: ['technology', 'culture', 'food', 'shopping', 'anime']
  },
  {
    name: 'New York',
    country: 'USA',
    region: 'North America',
    description: 'The Big Apple, a global center for finance, culture, and entertainment.',
    costLevel: 'luxury',
    averageDailyCost: 250,
    highlights: ['Times Square', 'Central Park', 'Statue of Liberty', 'Broadway'],
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    coordinates: { latitude: 40.7128, longitude: -74.0060 },
    timezone: 'America/New_York',
    language: 'English',
    currency: 'USD',
    bestTimeToVisit: { start: 'April', end: 'June' },
    tags: ['culture', 'shopping', 'food', 'entertainment', 'business']
  },
  {
    name: 'Bangkok',
    country: 'Thailand',
    region: 'Asia',
    description: 'A vibrant city known for its street food, temples, and bustling markets.',
    costLevel: 'moderate',
    averageDailyCost: 80,
    highlights: ['Grand Palace', 'Wat Phra Kaew', 'Chatuchak Market', 'Khao San Road'],
    imageUrl: 'https://images.unsplash.com/photo-1508009603885-50cf7c079365?w=800',
    coordinates: { latitude: 13.7563, longitude: 100.5018 },
    timezone: 'Asia/Bangkok',
    language: 'Thai',
    currency: 'THB',
    bestTimeToVisit: { start: 'November', end: 'February' },
    tags: ['food', 'culture', 'shopping', 'temples', 'nightlife']
  },
  {
    name: 'Istanbul',
    country: 'Turkey',
    region: 'Europe',
    description: 'A city spanning two continents, rich in history and culture.',
    costLevel: 'moderate',
    averageDailyCost: 90,
    highlights: ['Hagia Sophia', 'Blue Mosque', 'Grand Bazaar', 'Bosphorus Strait'],
    imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800',
    coordinates: { latitude: 41.0082, longitude: 28.9784 },
    timezone: 'Europe/Istanbul',
    language: 'Turkish',
    currency: 'TRY',
    bestTimeToVisit: { start: 'March', end: 'May' },
    tags: ['history', 'culture', 'food', 'architecture', 'shopping']
  }
];

export const sampleActivities = [
  {
    name: 'Eiffel Tower Visit',
    type: 'cultural',
    description: 'Visit the iconic symbol of Paris and enjoy panoramic views of the city.',
    city: 'Paris',
    country: 'France',
    cost: 30,
    duration: 3,
    difficulty: 'easy',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800',
    location: {
      address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
      coordinates: { latitude: 48.8584, longitude: 2.2945 }
    },
    tags: ['landmark', 'views', 'photography', 'romance'],
    bestTimeToVisit: { start: 'March', end: 'October' },
    bookingRequired: true,
    website: 'https://www.toureiffel.paris/'
  },
  {
    name: 'Sushi Making Class',
    type: 'food',
    description: 'Learn to make authentic Japanese sushi from expert chefs.',
    city: 'Tokyo',
    country: 'Japan',
    cost: 80,
    duration: 4,
    difficulty: 'moderate',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3d17c4fca98?w=800',
    location: {
      address: 'Various locations in Tokyo',
      coordinates: { latitude: 35.6762, longitude: 139.6503 }
    },
    tags: ['cooking', 'culture', 'food', 'learning'],
    bestTimeToVisit: { start: 'Year-round', end: 'Year-round' },
    bookingRequired: true
  },
  {
    name: 'Central Park Walking Tour',
    type: 'nature',
    description: 'Explore the famous urban park with a knowledgeable guide.',
    city: 'New York',
    country: 'USA',
    cost: 25,
    duration: 2,
    difficulty: 'easy',
    rating: 4.3,
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
    location: {
      address: 'Central Park, New York, NY 10024, USA',
      coordinates: { latitude: 40.7829, longitude: -73.9654 }
    },
    tags: ['nature', 'walking', 'history', 'outdoors'],
    bestTimeToVisit: { start: 'April', end: 'October' },
    bookingRequired: false
  },
  {
    name: 'Thai Cooking Class',
    type: 'food',
    description: 'Learn to cook authentic Thai dishes in a traditional setting.',
    city: 'Bangkok',
    country: 'Thailand',
    cost: 45,
    duration: 5,
    difficulty: 'moderate',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
    location: {
      address: 'Various locations in Bangkok',
      coordinates: { latitude: 13.7563, longitude: 100.5018 }
    },
    tags: ['cooking', 'culture', 'food', 'learning'],
    bestTimeToVisit: { start: 'Year-round', end: 'Year-round' },
    bookingRequired: true
  },
  {
    name: 'Bosphorus Cruise',
    type: 'nature',
    description: 'Take a scenic cruise along the Bosphorus Strait between Europe and Asia.',
    city: 'Istanbul',
    country: 'Turkey',
    cost: 35,
    duration: 2,
    difficulty: 'easy',
    rating: 4.4,
    imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800',
    location: {
      address: 'Various departure points along the Bosphorus',
      coordinates: { latitude: 41.0082, longitude: 28.9784 }
    },
    tags: ['cruise', 'views', 'history', 'photography'],
    bestTimeToVisit: { start: 'April', end: 'October' },
    bookingRequired: true
  }
];

export const sampleUsers = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    preferences: {
      favoriteDestinations: ['Paris', 'Tokyo'],
      travelStyle: 'moderate',
      interests: ['culture', 'food', 'photography']
    }
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    preferences: {
      favoriteDestinations: ['New York', 'Bangkok'],
      travelStyle: 'luxury',
      interests: ['shopping', 'entertainment', 'fine dining']
    }
  }
];
