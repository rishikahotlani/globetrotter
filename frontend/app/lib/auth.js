'use client';

export function saveAuth(token, user){
  if (typeof window === 'undefined') return;
  localStorage.setItem('tg_token', token);
  localStorage.setItem('tg_user', JSON.stringify(user));
}

export function getToken(){
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('tg_token');
}

export function getUser(){
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('tg_user');
  return raw ? JSON.parse(raw) : null;
}

export function clearAuth(){
  if (typeof window === 'undefined') return;
  localStorage.removeItem('tg_token');
  localStorage.removeItem('tg_user');
}

export async function authFetch(input, init = {}){
  const token = getToken();
  const headers = new Headers(init.headers || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);
  headers.set('Content-Type', 'application/json');
  return fetch(input, { ...init, headers });
}
