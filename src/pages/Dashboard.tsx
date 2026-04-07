import React from 'react';
import { useUserStore, useCalorieStore, useAppStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import { Activity, Heart, Search, Leaf, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const { name, dosha } = useUserStore();
  const { getTodayCalories, targetCalories } = useCalorieStore();
  const { favorites } = useAppStore();

  const todayCalories = getTodayCalories();
  const caloriePercent = Math.min((todayCalories / targetCalories) * 100, 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-emerald-900 mb-2">
          Namaste, {name || 'Guest'}
        </h1>
        <p className="text-stone-600 text-lg">Welcome to your Ayurvedic wellness journey.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Dosha Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 flex flex-col">
          <div className="flex items-center gap-3 mb-4 text-emerald-700">
            <Activity size={24} />
            <h2 className="font-semibold text-lg">Your Dosha</h2>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center py-4">
            {dosha ? (
              <>
                <span className="text-4xl font-serif font-bold text-emerald-800 mb-2">{dosha}</span>
                <p className="text-sm text-stone-500 text-center">Balanced diet recommended</p>
              </>
            ) : (
              <>
                <p className="text-stone-500 text-center mb-4">Discover your body type to get personalized recommendations.</p>
                <Link to="/dosha-quiz" className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1">
                  Take Quiz <ArrowRight size={16} />
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Calories Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 flex flex-col">
          <div className="flex items-center gap-3 mb-4 text-emerald-700">
            <Heart size={24} />
            <h2 className="font-semibold text-lg">Daily Calories</h2>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex justify-between items-end mb-2">
              <span className="text-3xl font-bold text-emerald-900">{todayCalories}</span>
              <span className="text-sm text-stone-500 mb-1">/ {targetCalories} kcal</span>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-3 mb-4 overflow-hidden">
              <div 
                className="bg-emerald-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${caloriePercent}%` }}
              ></div>
            </div>
            <Link to="/calorie-tracker" className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1 text-sm mt-auto">
              Log Food <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-emerald-800 rounded-2xl p-6 shadow-sm text-white md:col-span-2 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
            <Leaf size={160} />
          </div>
          <div className="relative z-10">
            <h2 className="font-serif text-2xl font-bold mb-2">Feeling Unwell?</h2>
            <p className="text-emerald-100 mb-6 max-w-md">Find natural, Ayurvedic remedies based on your symptoms instantly using our AI assistant.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/remedy-finder" className="bg-white text-emerald-800 px-5 py-2.5 rounded-full font-medium hover:bg-emerald-50 transition-colors flex items-center gap-2">
                <Search size={18} /> Find Remedy
              </Link>
              <Link to="/herb-scanner" className="bg-emerald-700 text-white px-5 py-2.5 rounded-full font-medium hover:bg-emerald-600 transition-colors flex items-center gap-2 border border-emerald-600">
                <Leaf size={18} /> Scan Herb
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Favorites Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-serif font-bold text-emerald-900 mb-6 flex items-center gap-2">
          <Heart className="text-emerald-600" fill="currentColor" size={24} /> Saved Remedies
        </h2>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map(fav => (
              <div key={fav.id} className="bg-white p-5 rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-emerald-800 text-lg mb-2">{fav.name}</h3>
                <p className="text-stone-600 text-sm line-clamp-2">{fav.benefits}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-emerald-200">
            <p className="text-stone-500 mb-4">You haven't saved any remedies yet.</p>
            <Link to="/remedy-finder" className="text-emerald-600 font-medium hover:underline">
              Explore remedies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
