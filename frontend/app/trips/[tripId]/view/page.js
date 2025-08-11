'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ItineraryViewPage() {
  const params = useParams();
  const router = useRouter();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' or 'calendar'

  useEffect(() => {
    loadTrip();
  }, [params.tripId]);

  const loadTrip = async () => {
    try {
      const res = await fetch(`/api/trips/${params.tripId}`);
      if (res.ok) {
        const { trip } = await res.json();
        setTrip(trip);
      }
    } catch (error) {
      console.error('Error loading trip:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading trip...</div>;
  }

  if (!trip) {
    return <div className="text-center py-8">Trip not found</div>;
  }

  // Calculate budget breakdown
  const calculateBudgetBreakdown = () => {
    if (!trip.activities) return { total: 0, breakdown: {} };
    
    let total = 0;
    const breakdown = {};
    
    Object.values(trip.activities).flat().forEach(activity => {
      total += activity.cost || 0;
      const type = activity.type || 'other';
      breakdown[type] = (breakdown[type] || 0) + (activity.cost || 0);
    });
    
    return { total, breakdown };
  };

  const { total: totalSpent, breakdown } = calculateBudgetBreakdown();
  const budgetRemaining = (trip.budget?.total || 0) - totalSpent;
  const budgetPercentage = trip.budget?.total ? (totalSpent / trip.budget.total) * 100 : 0;

  // Group activities by date
  const activitiesByDate = {};
  if (trip.activities) {
    Object.values(trip.activities).flat().forEach(activity => {
      if (activity.date) {
        const date = activity.date;
        if (!activitiesByDate[date]) {
          activitiesByDate[date] = [];
        }
        activitiesByDate[date].push(activity);
      }
    });
  }

  const sortedDates = Object.keys(activitiesByDate).sort();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{trip.name}</h1>
          <p className="text-gray-600">Your complete travel itinerary</p>
          {trip.description && (
            <p className="text-gray-500 mt-1">{trip.description}</p>
          )}
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => router.push(`/trips/${params.tripId}/itinerary`)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Edit Itinerary
          </button>
          <button
            onClick={() => setViewMode(viewMode === 'timeline' ? 'calendar' : 'timeline')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {viewMode === 'timeline' ? 'Calendar View' : 'Timeline View'}
          </button>
        </div>
      </div>

      {/* Trip Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Trip Dates</h3>
          <div className="space-y-2">
            {trip.startDate && (
              <div className="flex justify-between">
                <span className="text-gray-600">Start:</span>
                <span className="font-medium">{new Date(trip.startDate).toLocaleDateString()}</span>
              </div>
            )}
            {trip.endDate && (
              <div className="flex justify-between">
                <span className="text-gray-600">End:</span>
                <span className="font-medium">{new Date(trip.endDate).toLocaleDateString()}</span>
              </div>
            )}
            {trip.startDate && trip.endDate && (
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">
                  {Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24))} days
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Cities</h3>
          <div className="space-y-2">
            {trip.cities?.map((city, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-600">Stop {index + 1}:</span>
                <span className="font-medium">{city.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Budget Overview</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Budget:</span>
              <span className="font-medium">
                {trip.budget?.total || 0} {trip.budget?.currency || 'USD'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Spent:</span>
              <span className="font-medium">
                {totalSpent} {trip.budget?.currency || 'USD'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Remaining:</span>
              <span className={`font-medium ${budgetRemaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {budgetRemaining} {trip.budget?.currency || 'USD'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Breakdown Chart */}
      {Object.keys(breakdown).length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Budget Breakdown</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-3">
                {Object.entries(breakdown).map(([type, amount]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded ${
                        type === 'sightseeing' ? 'bg-blue-500' :
                        type === 'food' ? 'bg-green-500' :
                        type === 'adventure' ? 'bg-purple-500' :
                        type === 'culture' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`}></div>
                      <span className="capitalize">{type}</span>
                    </div>
                    <span className="font-medium">
                      {amount} {trip.budget?.currency || 'USD'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - budgetPercentage / 100)}`}
                    className="text-blue-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-semibold">{Math.round(budgetPercentage)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Itinerary View */}
      {viewMode === 'timeline' ? (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold">Day-by-Day Itinerary</h3>
          </div>
          
          {sortedDates.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No activities planned yet. 
              <button
                onClick={() => router.push(`/trips/${params.tripId}/itinerary`)}
                className="text-blue-600 hover:underline ml-1"
              >
                Add some activities
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {sortedDates.map((date, dateIndex) => (
                <div key={date} className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">{dateIndex + 1}</span>
                    </div>
                    <h4 className="text-lg font-semibold">
                      {new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h4>
                  </div>
                  
                  <div className="ml-12 space-y-4">
                    {activitiesByDate[date]
                      .sort((a, b) => (a.duration || 0) - (b.duration || 0))
                      .map((activity, activityIndex) => (
                      <div key={activity.id || activityIndex} className="border-l-2 border-gray-200 pl-4 py-2">
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
                              <span className="text-sm text-gray-500">⏱️ {activity.duration || 1}h</span>
                            </div>
                            
                            <h5 className="font-medium text-lg">{activity.name}</h5>
                            {activity.description && (
                              <p className="text-gray-600 mt-1">{activity.description}</p>
                            )}
                            
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span>💰 {activity.cost || 0} {trip.budget?.currency || 'USD'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Calendar View */
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Calendar View</h3>
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-medium text-gray-500 p-2">
                {day}
              </div>
            ))}
            
            {/* Calendar grid would go here - simplified for now */}
            <div className="col-span-7 text-center text-gray-500 py-8">
              Calendar view coming soon...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
