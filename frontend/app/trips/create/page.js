'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authFetch, getUser } from '../../lib/auth';

export default function CreateTripPage() {
  const router = useRouter();
  const user = getUser();
  const [form, setForm] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: 0,
    cities: []
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      router.push('/login');
      return;
    }
    setLoading(true);
    
    try {
      const payload = {
        ...form,
        startDate: form.startDate || new Date().toISOString(),
        endDate: form.endDate || new Date(Date.now()+86400000).toISOString(),
        activities: [],
        userId: user.id,
      };
      const res = await authFetch('/api/trips', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        const { trip } = await res.json();
        router.push(`/trips/${trip._id || trip.id}/itinerary`);
      }
    } catch (error) {
      console.error('Error creating trip:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCity = () => {
    setForm(prev => ({
      ...prev,
      cities: [...prev.cities, { name: '', country: '', startDate: '', endDate: '' }]
    }));
  };

  const updateCity = (index, field, value) => {
    setForm(prev => ({
      ...prev,
      cities: prev.cities.map((city, i) => 
        i === index ? { ...city, [field]: value } : city
      )
    }));
  };

  const removeCity = (index) => {
    setForm(prev => ({
      ...prev,
      cities: prev.cities.filter((_, i) => i !== index)
    }));
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="mb-4 text-[#5A827E] text-lg">Please login to create a trip.</p>
        <a href="/login" className="text-[#84AE92] hover:text-[#5A827E] font-medium">Go to login</a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#5A827E]">Create New Trip</h1>
        <button
          onClick={() => router.back()}
          className="text-[#84AE92] hover:text-[#5A827E] transition-colors font-medium"
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Trip Info */}
        <div className="bg-white rounded-lg shadow-lg border border-[#B9D4AA] p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-[#5A827E]">Trip Details</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#5A827E] mb-3">
                Trip Title *
              </label>
              <input
                type="text"
                required
                className="w-full border border-[#B9D4AA] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#84AE92] focus:border-transparent"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g., European Adventure"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#5A827E] mb-3">
                Description
              </label>
              <input
                type="text"
                className="w-full border border-[#B9D4AA] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#84AE92] focus:border-transparent"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief description of your trip"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#5A827E] mb-3">
                Start Date
              </label>
              <input
                type="date"
                className="w-full border border-[#B9D4AA] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#84AE92] focus:border-transparent"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#5A827E] mb-3">
                End Date
              </label>
              <input
                type="date"
                className="w-full border border-[#B9D4AA] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#84AE92] focus:border-transparent"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="bg-white rounded-lg shadow-lg border border-[#B9D4AA] p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-[#5A827E]">Budget Planning</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#5A827E] mb-3">
                Total Budget (USD)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="w-full border border-[#B9D4AA] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#84AE92] focus:border-transparent"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        {/* Cities */}
        <div className="bg-white rounded-lg shadow-lg border border-[#B9D4AA] p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-[#5A827E]">Cities & Stops</h2>
            <button
              type="button"
              onClick={addCity}
              className="bg-[#84AE92] text-white px-6 py-3 rounded-lg hover:bg-[#5A827E] transition-colors font-semibold"
            >
              + Add City
            </button>
          </div>

          {form.cities.length === 0 ? (
            <p className="text-[#5A827E] text-center py-12 text-lg">
              No cities added yet. Click "Add City" to start planning your itinerary.
            </p>
          ) : (
            <div className="space-y-6">
              {form.cities.map((city, index) => (
                <div key={index} className="border border-[#B9D4AA] rounded-lg p-6 space-y-4 bg-[#FAFFCA] bg-opacity-30">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-[#5A827E]">Stop {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeCity(index)}
                      className="text-[#84AE92] hover:text-[#5A827E] text-sm font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#5A827E] mb-2">
                        City Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full border border-[#B9D4AA] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#84AE92] focus:border-transparent"
                        value={city.name}
                        onChange={(e) => updateCity(index, 'name', e.target.value)}
                        placeholder="e.g., Paris"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#5A827E] mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        className="w-full border border-[#B9D4AA] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#84AE92] focus:border-transparent"
                        value={city.country}
                        onChange={(e) => updateCity(index, 'country', e.target.value)}
                        placeholder="e.g., France"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#5A827E] mb-2">
                        Arrival Date
                      </label>
                      <input
                        type="date"
                        className="w-full border border-[#B9D4AA] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#84AE92] focus:border-transparent"
                        value={city.startDate}
                        onChange={(e) => updateCity(index, 'startDate', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#5A827E] mb-2">
                        Departure Date
                      </label>
                      <input
                        type="date"
                        className="w-full border border-[#B9D4AA] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#84AE92] focus:border-transparent"
                        value={city.endDate}
                        onChange={(e) => updateCity(index, 'endDate', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-8 py-4 border border-[#B9D4AA] rounded-lg text-[#5A827E] hover:bg-[#FAFFCA] transition-colors font-semibold"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={loading || !form.title}
            className="px-8 py-4 bg-[#5A827E] text-white rounded-lg hover:bg-[#4A726E] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold shadow-lg"
          >
            {loading ? 'Creating...' : 'Create Trip & Build Itinerary'}
          </button>
        </div>
      </form>
    </div>
  );
}
