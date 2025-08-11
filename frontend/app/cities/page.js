'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Mock city data - in a real app, this would come from an API
const mockCities = [
  {
    id: 1,
    name: 'Paris',
    country: 'France',
    region: 'Europe',
    costIndex: 85,
    popularity: 95,
    description: 'The City of Light, known for art, fashion, gastronomy and culture.',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop',
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral']
  },
  {
    id: 2,
    name: 'Tokyo',
    country: 'Japan',
    region: 'Asia',
    costIndex: 90,
    popularity: 88,
    description: 'A fascinating blend of ultramodern and traditional, offering a unique cultural experience.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
    highlights: ['Shibuya Crossing', 'Senso-ji Temple', 'Tokyo Skytree']
  },
  {
    id: 3,
    name: 'New York',
    country: 'USA',
    region: 'North America',
    costIndex: 95,
    popularity: 92,
    description: 'The Big Apple, a global center of finance, culture, and entertainment.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop',
    highlights: ['Times Square', 'Central Park', 'Statue of Liberty']
  },
  {
    id: 4,
    name: 'Barcelona',
    country: 'Spain',
    region: 'Europe',
    costIndex: 70,
    popularity: 85,
    description: 'A vibrant city known for its unique architecture, beaches, and Mediterranean lifestyle.',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=300&fit=crop',
    highlights: ['Sagrada Familia', 'Park Güell', 'La Rambla']
  },
  {
    id: 5,
    name: 'Bangkok',
    country: 'Thailand',
    region: 'Asia',
    costIndex: 45,
    popularity: 78,
    description: 'A bustling metropolis offering a mix of traditional temples and modern city life.',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c079365?w=400&h=300&fit=crop',
    highlights: ['Grand Palace', 'Wat Phra Kaew', 'Chatuchak Market']
  },
  {
    id: 6,
    name: 'Sydney',
    country: 'Australia',
    region: 'Oceania',
    costIndex: 80,
    popularity: 82,
    description: 'A stunning harbor city known for its iconic Opera House and beautiful beaches.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=300&fit=crop',
    highlights: ['Sydney Opera House', 'Bondi Beach', 'Harbor Bridge']
  }
];

export default function CitiesPage() {
  const router = useRouter();
  const [cities, setCities] = useState(mockCities);
  const [filteredCities, setFilteredCities] = useState(mockCities);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCostRange, setSelectedCostRange] = useState('');
  const [sortBy, setSortBy] = useState('popularity');

  const regions = [...new Set(mockCities.map(city => city.region))];
  const costRanges = [
    { label: 'Budget (< 50)', value: 'low' },
    { label: 'Mid-range (50-80)', value: 'mid' },
    { label: 'Luxury (> 80)', value: 'high' }
  ];

  useEffect(() => {
    filterCities();
  }, [searchTerm, selectedRegion, selectedCostRange, sortBy]);

  const filterCities = () => {
    let filtered = [...cities];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Region filter
    if (selectedRegion) {
      filtered = filtered.filter(city => city.region === selectedRegion);
    }

    // Cost filter
    if (selectedCostRange) {
      switch (selectedCostRange) {
        case 'low':
          filtered = filtered.filter(city => city.costIndex < 50);
          break;
        case 'mid':
          filtered = filtered.filter(city => city.costIndex >= 50 && city.costIndex <= 80);
          break;
        case 'high':
          filtered = filtered.filter(city => city.costIndex > 80);
          break;
      }
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.popularity - a.popularity;
        case 'cost':
          return a.costIndex - b.costIndex;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredCities(filtered);
  };

  const getCostLabel = (costIndex) => {
    if (costIndex < 50) return 'Budget';
    if (costIndex < 80) return 'Mid-range';
    return 'Luxury';
  };

  const getCostColor = (costIndex) => {
    if (costIndex < 50) return 'text-green-600 bg-green-100';
    if (costIndex < 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const addToTrip = (city) => {
    // In a real app, this would open a modal to select which trip to add to
    // For now, we'll just show an alert
    alert(`Would you like to add ${city.name} to a trip? This feature is coming soon!`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Discover Cities</h1>
        <p className="text-gray-600">Find amazing destinations to add to your trips</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Cities
            </label>
            <input
              type="text"
              placeholder="Search by name, country, or description..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Region
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cost Range
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
              Sort By
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popularity">Most Popular</option>
              <option value="cost">Lowest Cost</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredCities.length} of {cities.length} cities
        </p>
        <button
          onClick={() => {
            setSearchTerm('');
            setSelectedRegion('');
            setSelectedCostRange('');
            setSortBy('popularity');
          }}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          Clear all filters
        </button>
      </div>

      {/* Cities Grid */}
      {filteredCities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No cities found matching your criteria.</p>
          <p className="text-gray-400">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map(city => (
            <div key={city.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCostColor(city.costIndex)}`}>
                    {getCostLabel(city.costIndex)}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-black bg-opacity-75 text-white">
                    ⭐ {city.popularity}%
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold">{city.name}</h3>
                    <p className="text-gray-600">{city.country}</p>
                  </div>
                  <span className="text-sm text-gray-500">{city.region}</span>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-3">{city.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Highlights:</h4>
                  <div className="flex flex-wrap gap-1">
                    {city.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Cost Index: <span className="font-medium">{city.costIndex}/100</span>
                  </div>
                  <button
                    onClick={() => addToTrip(city)}
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
