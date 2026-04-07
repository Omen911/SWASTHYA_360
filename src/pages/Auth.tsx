import React, { useState } from 'react';
import { useUserStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';

export default function Auth() {
  const { login } = useUserStore();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim());
      navigate('/');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-emerald-100 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Leaf size={32} />
        </div>
        <h1 className="text-3xl font-serif font-bold text-emerald-900 mb-2">Swasthya 360</h1>
        <p className="text-stone-500 mb-8">Enter your name to begin your Ayurvedic journey.</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white font-medium py-3 rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
          >
            Start Journey
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-stone-100 text-sm text-stone-400">
          <p>For educational purposes only.</p>
          <p>Data is stored locally on your device.</p>
        </div>
      </div>
    </div>
  );
}
