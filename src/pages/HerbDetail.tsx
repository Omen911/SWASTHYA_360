import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { HERBS } from '../constants/herbs';
import { ArrowLeft, AlertTriangle, Leaf, BookOpen } from 'lucide-react';

export default function HerbDetail() {
  const { id } = useParams<{ id: string }>();
  const herb = HERBS.find(h => h.id === id);

  if (!herb) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Herb not found</h2>
        <Link to="/herb-library" className="text-emerald-600 hover:underline">Back to Library</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <Link to="/herb-library" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-800 font-medium">
        <ArrowLeft size={18} /> Back to Library
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 overflow-hidden">
        <div className="aspect-[21/9] overflow-hidden">
          <img src={herb.image} alt={herb.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        
        <div className="p-8 md:p-12 space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-emerald-900 mb-2">{herb.name}</h1>
            <p className="text-xl text-stone-500 italic">{herb.scientificName}</p>
          </div>

          <div className="prose prose-emerald max-w-none">
            <h3 className="font-serif text-2xl text-emerald-800 flex items-center gap-2">
              <BookOpen size={24} /> Ayurvedic History
            </h3>
            <p className="text-stone-700 leading-relaxed">{herb.history}</p>

            <h3 className="font-serif text-2xl text-emerald-800 flex items-center gap-2 mt-8">
              <Leaf size={24} /> Benefits
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {herb.benefits.map((b, i) => (
                <li key={i} className="bg-emerald-50 text-emerald-900 px-4 py-2 rounded-lg font-medium">{b}</li>
              ))}
            </ul>

            <h3 className="font-serif text-2xl text-emerald-800 mt-8">Usage Instructions</h3>
            <ul className="list-disc list-inside text-stone-700 space-y-2">
              {herb.usage.map((u, i) => <li key={i}>{u}</li>)}
            </ul>

            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 mt-8">
              <h3 className="font-serif text-2xl text-amber-900 flex items-center gap-2 mb-4">
                <AlertTriangle size={24} /> Precautions
              </h3>
              <p className="text-amber-900/80">{herb.precautions}</p>
            </div>

            <h3 className="font-serif text-2xl text-emerald-800 mt-8">Scientific Information</h3>
            <p className="text-stone-700 leading-relaxed">{herb.scientificInfo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
