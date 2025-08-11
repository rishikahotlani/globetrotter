'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Mock activity data - in a real app, this would come from an API
const mockActivities = [
  {
    id: 1,
    name: 'Eiffel Tower Visit',
    type: 'sightseeing',
    city: 'Paris',
    country: 'France',
    cost: 25,
    duration: 2,
    description: 'Visit the iconic Eiffel Tower and enjoy panoramic views of Paris.',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 1247,
    tags: ['landmark', 'views', 'photography']
  },
  {
    id: 2,
    name: 'Louvre Museum Tour',
    type: 'culture',
    city: 'Paris',
    country: 'France',
    cost: 17,
    duration: 3,
    description: 'Explore the world\'s largest art museum and see the Mona Lisa.',
    image: 'https://images.unsplash.com/photo-1565967511849-76a3a32c35fa?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 892,
    tags: ['art', 'museum', 'history']
  },
  {
    id: 3,
    name: 'Shibuya Crossing Experience',
    type: 'sightseeing',
    city: 'Tokyo',
    country: 'Japan',
    cost: 0,
    duration: 1,
    description: 'Experience the world\'s busiest pedestrian crossing.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
    rating: 4.5,
    reviews: 567,
    tags: ['urban', 'photography', 'free']
  },
  {
    id: 4,
    name: 'Senso-ji Temple Visit',
    type: 'culture',
    city: 'Tokyo',
    country: 'Japan',
    cost: 0,
    duration: 1.5,
    description: 'Visit Tokyo\'s oldest temple and experience traditional Japanese culture.',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 423,
    tags: ['temple', 'traditional', 'free']
  },
  {
    id: 5,
    name: 'Central Park Walking Tour',
    type: 'sightseeing',
    city: 'New York',
    country: 'USA',
    cost: 0,
    duration: 2,
    description: 'Explore the famous Central Park with its lakes, gardens, and landmarks.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    rating: 4.4,
    reviews: 756,
    tags: ['park', 'nature', 'free']
  },
  {
    id: 6,
    name: 'Broadway Show',
    type: 'entertainment',
    city: 'New York',
    country: 'USA',
    cost: 120,
    duration: 3,
    description: 'Experience a world-class Broadway musical or play.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 234,
    tags: ['theater', 'entertainment', 'luxury']
  },
  {
    id: 7,
    name: 'Sagrada Familia Tour',
    type: 'sightseeing',
    city: 'Barcelona',
    country: 'Spain',
    cost: 26,
    duration: 2.5,
    description: 'Visit Gaudi\'s masterpiece, the stunning Sagrada Familia basilica.',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 678,
    tags: ['architecture', 'church', 'gaudi']
  },
  {
    id: 8,
    name: 'Thai Cooking Class',
    type: 'food',
    city: 'Bangkok',
    country: 'Thailand',
    cost: 35,
    duration: 4,
    description: 'Learn to cook authentic Thai dishes with a local chef.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 189,
    tags: ['cooking', 'local', 'food']
  },
  {
    id: 9,
    name: 'Bondi Beach Surfing',
    type: 'adventure',
    city: 'Sydney',
    country: 'Australia',
    cost: 65,
    duration: 3,
    description: 'Learn to surf at one of Australia\'s most famous beaches.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    rating: 4.5,
    reviews: 312,
    tags: ['surfing', 'beach', 'sports']
  }
];

export default function ActivitiesPage() {
  const router = useRouter();
  const [activities, setActivities] = useState(mockActivities);
  const [filteredActivities, setFilteredActivities] = useState(mockActivities);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCostRange, setSelectedCostRange] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const activityTypes = [...new Set(mockActivities.map(activity => activity.type))];
  const cities = [...new Set(mockActivities.map(activity => activity.city))];
  const costRanges = [
    { label: 'Free', value: 'free' },
    { label: 'Budget (< $25)', value: 'budget' },
    { label: 'Mid-range ($25-$75)', value: 'mid' },
    { label: 'Luxury (> $75)', value: 'luxury' }
  ];
  const durationRanges = [
    { label: 'Quick (< 1h)', value: 'quick' },
    { label: 'Short (1-2h)', value: 'short' },
    { label: 'Medium (2-4h)', value: 'medium' },
    { label: 'Long (> 4h)', value: 'long' }
  ];

  useEffect(() => {
    filterActivities();
  }, [searchTerm, selectedType, selectedCity, selectedCostRange, selectedDuration, sortBy]);

  const filterActivities = () => {
    let filtered = [...activities];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(activity =>
        activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Type filter
    if (selectedType) {
      filtered = filtered.filter(activity => activity.type === selectedType);
    }

    // City filter
    if (selectedCity) {
      filtered = filtered.filter(activity => activity.city === selectedCity);
    }

    // Cost filter
    if (selectedCostRange) {
      switch (selectedCostRange) {
        case 'free':
          filtered = filtered.filter(activity => activity.cost === 0);
          break;
        case 'budget':
          filtered = filtered.filter(activity => activity.cost > 0 && activity.cost < 25);
          break;
        case 'mid':
          filtered = filtered.filter(activity => activity.cost >= 25 && activity.cost <= 75);
          break;
        case 'luxury':
          filtered = filtered.filter(activity => activity.cost > 75);
          break;
      }
    }

    // Duration filter
    if (selectedDuration) {
      switch (selectedDuration) {
        case 'quick':
          filtered = filtered.filter(activity => activity.duration < 1);
          break;
        case 'short':
          filtered = filtered.filter(activity => activity.duration >= 1 && activity.duration <= 2);
          break;
        case 'medium':
          filtered = filtered.filter(activity => activity.duration > 2 && activity.duration <= 4);
          break;
        case 'long':
          filtered = filtered.filter(activity => activity.duration > 4);
          break;
      }
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'cost':
          return a.cost - b.cost;
        case 'duration':
          return a.duration - b.duration;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredActivities(filtered);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'sightseeing': return 'bg-blue-100 text-blue-800';
      case 'culture': return 'bg-yellow-100 text-yellow-800';
      case 'food': return 'bg-green-100 text-green-800';
      case 'adventure': return 'bg-purple-100 text-purple-800';
      case 'entertainment': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCostLabel = (cost) => {
    if (cost === 0) return 'Free';
    if (cost < 25) return 'Budget';
    if (cost < 75) return 'Mid-range';
    return 'Luxury';
  };

  const getCostColor = (cost) => {
    if (cost === 0) return 'text-green-600 bg-green-100';
    if (cost < 25) return 'text-blue-600 bg-blue-100';
    if (cost < 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const addToTrip = (activity) => {
    // In a real app, this would open a modal to select which trip to add to
    alert(`Would you like to add "${activity.name}" to a trip? This feature is coming soon!`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Discover Activities</h1>
        <p className="text-gray-600">Find amazing experiences to add to your trips</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Activities
            </label>
            <input
              type="text"
              placeholder="Search by name, description, or tags..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">All Types</option>
              {activityTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cost
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCostRange}
              onChange={(e) => setSelectedCostRange(e.target.value)}
            >
              <option value="">All Costs</option>
              {costRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
            >
              <option value="">All Durations</option>
              {durationRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="block text-sm font-medium text-gray-700">
              Sort By:
            </label>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Highest Rated</option>
              <option value="cost">Lowest Cost</option>
              <option value="duration">Shortest Duration</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>

          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedType('');
              setSelectedCity('');
              setSelectedCostRange('');
              setSelectedDuration('');
              setSortBy('rating');
            }}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Clear all filters
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredActivities.length} of {activities.length} activities
        </p>
      </div>

      {/* Activities Grid */}
      {filteredActivities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No activities found matching your criteria.</p>
          <p className="text-gray-400">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map(activity => (
            <div key={activity.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={activity.image}
                  alt={activity.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(activity.type)}`}>
                    {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCostColor(activity.cost)}`}>
                    {getCostLabel(activity.cost)}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-black bg-opacity-75 text-white">
                    ⭐ {activity.rating} ({activity.reviews})
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-xl font-semibold mb-1">{activity.name}</h3>
                  <p className="text-gray-600">{activity.city}, {activity.country}</p>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-3">{activity.description}</p>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>💰 {activity.cost === 0 ? 'Free' : `$${activity.cost}`}</span>
                    <span>⏱️ {activity.duration}h</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {activity.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {activity.reviews} reviews
                  </div>
                  <button
                    onClick={() => addToTrip(activity)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Add to Trip
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
