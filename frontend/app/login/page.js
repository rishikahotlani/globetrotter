'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveAuth } from '../lib/auth';

export default function LoginPage(){
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e){
    e.preventDefault();
    setLoading(true);
    setError('');
    try{
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if(!res.ok){
        setError(data.error || 'Login failed');
      }else{
        saveAuth(data.token, data.user);
        router.push('/trips');
      }
    }catch(err){
      setError('Network error');
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg border border-[#B9D4AA] p-8 mt-8">
      <h1 className="text-3xl font-bold mb-6 text-[#5A827E] text-center">Sign In</h1>
      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#5A827E] mb-2">Email</label>
          <input 
            className="w-full border border-[#B9D4AA] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#84AE92] focus:border-transparent" 
            type="email" 
            required 
            value={email} 
            onChange={e=>setEmail(e.target.value)} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#5A827E] mb-2">Password</label>
          <input 
            className="w-full border border-[#B9D4AA] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#84AE92] focus:border-transparent" 
            type="password" 
            required 
            value={password} 
            onChange={e=>setPassword(e.target.value)} 
          />
        </div>
        <button 
          disabled={loading} 
          className="w-full bg-[#5A827E] text-white py-3 rounded-lg hover:bg-[#4A726E] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      <p className="text-sm text-[#5A827E] mt-6 text-center">
        No account? <a className="text-[#84AE92] hover:text-[#5A827E] font-medium" href="/register">Register</a>
      </p>
    </div>
  );
}
