'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ItineraryBuilderPage() {
  const params = useParams();
  const router = useRouter();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState({});
  const [newActivity, setNewActivity] = useState({
    cityId: '',
    date: '',
    name: '',
    description: '',
    cost: 0,
    duration: 1,
    type: 'sightseeing'
  });

  useEffect(() => {
    loadTrip();
  }, [params.tripId]);

  const loadTrip = async () => {
    try {
      const res = await fetch(`/api/trips/${params.tripId}`);
      if (res.ok) {
        const { trip } = await res.json();
        setTrip(trip);
        // Initialize activities for each city
        const initialActivities = {};
        trip.cities.forEach(city => {
          initialActivities[city.id || city.name] = [];
        });
        setActivities(initialActivities);
      }
    } catch (error) {
      console.error('Error loading trip:', error);
    } finally {
      setLoading(false);
    }
  };

  const addActivity = () => {
    if (!newActivity.cityId || !newActivity.name) return;
    
    setActivities(prev => ({
      ...prev,
      [newActivity.cityId]: [
        ...(prev[newActivity.cityId] || []),
        {
          id: Date.now().toString(),
          ...newActivity
        }
      ]
    }));
    
    setNewActivity({
      cityId: '',
      date: '',
      name: '',
      description: '',
      cost: 0,
      duration: 1,
      type: 'sightseeing'
    });
  };

  const removeActivity = (cityId, activityId) => {
    setActivities(prev => ({
      ...prev,
      [cityId]: prev[cityId].filter(a => a.id !== activityId)
    }));
  };

  const updateActivity = (cityId, activityId, field, value) => {
    setActivities(prev => ({
      ...prev,
      [cityId]: prev[cityId].map(a => 
        a.id === activityId ? { ...a, [field]: value } : a
      )
    }));
  };

  const saveItinerary = async () => {
    try {
      await fetch(`/api/trips/${params.tripId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activities: activities
        }),
      });
      router.push(`/trips/${params.tripId}/view`);
    } catch (error) {
      console.error('Error saving itinerary:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading trip...</div>;
  }

  if (!trip) {
    return <div className="text-center py-8">Trip not found</div>;
  }

  const activityTypes = [
    'sightseeing',
    'food',
    'adventure',
    'culture',
    'shopping',
    'relaxation',
    'transport'
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{trip.name}</h1>
          <p className="text-gray-600">Build your detailed itinerary</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => router.push(`/trips/${params.tripId}/view`)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            View Itinerary
          </button>
          <button
            onClick={saveItinerary}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Itinerary
          </button>
        </div>
      </div>

      {/* Add New Activity Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Activity</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newActivity.cityId}
              onChange={(e) => setNewActivity({ ...newActivity, cityId: e.target.value })}
            >
              <option value="">Select a city</option>
              {trip.cities.map((city, index) => (
                <option key={city.id || city.name} value={city.id || city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newActivity.date}
              onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Type
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newActivity.type}
              onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value })}
            >
              {activityTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Name *
            </label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newActivity.name}
              onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
              placeholder="e.g., Visit Eiffel Tower"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cost ({trip.budget?.currency || 'USD'})
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newActivity.cost}
              onChange={(e) => setNewActivity({ ...newActivity, cost: parseFloat(e.target.value) || 0 })}
              placeholder="0.00"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (hours)
            </label>
            <input
              type="number"
              min="0.5"
              step="0.5"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newActivity.duration}
              onChange={(e) => setNewActivity({ ...newActivity, duration: parseFloat(e.target.value) || 1 })}
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="2"
            value={newActivity.description}
            onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
            placeholder="Brief description of the activity..."
          />
        </div>
        
        <div className="mt-4">
          <button
            onClick={addActivity}
            disabled={!newActivity.cityId || !newActivity.name}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Activity
          </button>
        </div>
      </div>

      {/* Itinerary by City */}
      <div className="space-y-6">
        {trip.cities.map((city, cityIndex) => (
          <div key={city.id || city.name} className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold">{city.name}</h3>
              {city.country && <p className="text-gray-600">{city.country}</p>}
              {city.startDate && city.endDate && (
                <p className="text-sm text-gray-500">
                  {new Date(city.startDate).toLocaleDateString()} - {new Date(city.endDate).toLocaleDateString()}
                </p>
              )}
            </div>
            
            <div className="p-6">
              {(!activities[city.id || city.name] || activities[city.id || city.name].length === 0) ? (
                <p className="text-gray-500 text-center py-8">
                  No activities planned yet. Add some activities above!
                </p>
              ) : (
                <div className="space-y-4">
                  {activities[city.id || city.name]
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((activity, activityIndex) => (
                    <div key={activity.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              activity.type === 'sightseeing' ? 'bg-blue-100 text-blue-800' :
                              activity.type === 'food' ? 'bg-green-100 text-green-800' :
                              activity.type === 'adventure' ? 'bg-purple-100 text-purple-800' :
                              activity.type === 'culture' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                            </span>
                            {activity.date && (
                              <span className="text-sm text-gray-600">
                                {new Date(activity.date).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          
                          <h4 className="font-medium text-lg">{activity.name}</h4>
                          {activity.description && (
                            <p className="text-gray-600 mt-1">{activity.description}</p>
                          )}
                          
                          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                            <span>💰 {activity.cost} {trip.budget?.currency || 'USD'}</span>
                            <span>⏱️ {activity.duration}h</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeActivity(city.id || city.name, activity.id)}
                          className="text-red-600 hover:text-red-800 ml-4"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
