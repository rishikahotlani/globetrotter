"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { authFetch, getUser } from '../lib/auth';

function TripCard({ trip, onDelete }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-3 border border-[#B9D4AA] hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg text-[#5A827E]">{trip.title || trip.name}</h3>
        <div className="flex items-center space-x-2">
          <Link
            href={`/trips/${trip._id || trip.id}/view`}
            className="text-[#84AE92] hover:text-[#5A827E] hover:underline text-sm transition-colors"
          >
            View
          </Link>
          <Link
            href={`/trips/${trip._id || trip.id}/itinerary`}
            className="text-[#B9D4AA] hover:text-[#84AE92] hover:underline text-sm transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(trip._id || trip.id)}
            className="text-[#FAFFCA] hover:text-[#B9D4AA] hover:underline text-sm transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600">{trip.description || 'No description'}</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{(trip.startDate && new Date(trip.startDate).toISOString().slice(0,10)) || 'TBD'} → {(trip.endDate && new Date(trip.endDate).toISOString().slice(0,10)) || 'TBD'}</span>
        {trip.cities && trip.cities.length > 0 && (
          <span>{trip.cities.length} cities</span>
        )}
      </div>
      {typeof trip.budget === 'number' && trip.budget > 0 && (
        <div className="text-xs text-[#5A827E] font-medium">
          Budget: {trip.budget} USD
        </div>
      )}
    </div>
  );
}

export default function TripsPage() {
  const [trips, setTrips] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', startDate: '', endDate: '', budget: 0 });
  const [loading, setLoading] = useState(true);
  const user = getUser();

  async function loadTrips() {
    setLoading(true);
    const res = await authFetch('/api/trips');
    const data = await res.json();
    setTrips(data.trips || data.items || []);
    setLoading(false);
  }

  useEffect(() => {
    if (!user) return;
    loadTrips();
  }, []);

  async function createTrip(e) {
    e.preventDefault();
    const payload = {
      title: form.title,
      description: form.description,
      startDate: form.startDate || new Date().toISOString(),
      endDate: form.endDate || new Date(Date.now() + 86400000).toISOString(),
      budget: Number(form.budget) || 0,
      cities: [],
      activities: [],
      userId: user?.id,
    };
    const res = await authFetch('/api/trips', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setForm({ title: '', description: '', startDate: '', endDate: '', budget: 0 });
      await loadTrips();
    }
  }

  async function deleteTrip(id) {
    await authFetch(`/api/trips/${id}`, { method: 'DELETE' });
    await loadTrips();
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="mb-4 text-[#5A827E] text-lg">Please login to view your trips.</p>
        <a href="/login" className="text-[#84AE92] hover:text-[#5A827E] font-medium">Go to login</a>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#5A827E]">My Trips</h1>
        <Link
          href="/trips/create"
          className="bg-[#5A827E] text-white px-6 py-3 rounded-lg hover:bg-[#4A726E] transition-colors font-semibold shadow-lg"
        >
          + Create New Trip
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg border border-[#B9D4AA] p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#5A827E]">Quick Trip Creation</h2>
        <form onSubmit={createTrip} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              className="border border-[#B9D4AA] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#84AE92] focus:border-transparent"
              placeholder="Trip title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <input
              className="border border-[#B9D4AA] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#84AE92] focus:border-transparent"
              placeholder="Short description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <input type="date" className="border border-[#B9D4AA] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#84AE92] focus:border-transparent" value={form.startDate} onChange={(e)=>setForm({...form, startDate: e.target.value})} />
            <input type="date" className="border border-[#B9D4AA] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#84AE92] focus:border-transparent" value={form.endDate} onChange={(e)=>setForm({...form, endDate: e.target.value})} />
            <input type="number" min="0" className="border border-[#B9D4AA] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#84AE92] focus:border-transparent" placeholder="Budget" value={form.budget} onChange={(e)=>setForm({...form, budget: e.target.value})} />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-[#84AE92] text-white px-6 py-3 rounded-lg hover:bg-[#5A827E] transition-colors font-semibold">
              Create Simple Trip
            </button>
            <Link
              href="/trips/create"
              className="text-[#84AE92] hover:text-[#5A827E] text-sm font-medium"
            >
              Or create detailed trip with cities and dates →
            </Link>
          </div>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-[#5A827E]">Your Trips</h2>
        {loading ? (
          <p className="text-[#5A827E]">Loading…</p>
        ) : trips.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-lg border border-[#B9D4AA]">
            <div className="text-6xl mb-4">✈️</div>
            <p className="text-[#5A827E] mb-4 text-lg">No trips yet. Start planning your next adventure!</p>
            <Link
              href="/trips/create"
              className="bg-[#5A827E] text-white px-8 py-3 rounded-lg hover:bg-[#4A726E] transition-colors font-semibold shadow-lg"
            >
              Create Your First Trip
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((t) => (
              <TripCard key={t._id || t.id} trip={t} onDelete={deleteTrip} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


