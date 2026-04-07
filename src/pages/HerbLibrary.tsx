import React from 'react';
import { Link } from 'react-router-dom';
import { HERBS } from '../constants/herbs';
import { Search } from 'lucide-react';

export default function HerbLibrary() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-serif font-bold text-emerald-900">Ayurvedic Herb Library</h1>
        <p className="text-stone-600">Explore the healing properties of ancient Indian herbs.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {HERBS.map((herb) => (
          <Link 
            key={herb.id} 
            to={`/herb-library/${herb.id}`}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-emerald-100 hover:shadow-lg transition-all group"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src={herb.image} 
                alt={herb.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6">
              <h3 className="font-serif text-xl font-bold text-emerald-900 mb-1">{herb.name}</h3>
              <p className="text-sm text-stone-500 italic mb-4">{herb.scientificName}</p>
              <p className="text-stone-600 text-sm line-clamp-2">{herb.history}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
