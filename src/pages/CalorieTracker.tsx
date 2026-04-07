import React, { useState } from 'react';
import { useUserStore, useCalorieStore } from '../store/useStore';
import { Calculator, Plus, Trash2, Heart } from 'lucide-react';

export default function CalorieTracker() {
  const { dosha } = useUserStore();
  const { targetCalories, setTargetCalories, entries, addEntry, removeEntry, getTodayCalories } = useCalorieStore();
  
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState('1.2'); // Sedentary

  const [foodName, setFoodName] = useState('');
  const [foodCalories, setFoodCalories] = useState('');

  const today = new Date().toISOString().split('T')[0];
  const todayEntries = entries.filter(e => e.date === today);
  const consumed = getTodayCalories();
  const remaining = targetCalories - consumed;

  const calculateCalories = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic BMR calculation (Mifflin-St Jeor)
    let bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age);
    bmr += gender === 'male' ? 5 : -161;
    
    let tdee = bmr * Number(activity);

    // Ayurvedic adjustment based on Dosha
    if (dosha === 'Vata') tdee += 200; // Fast metabolism
    if (dosha === 'Kapha') tdee -= 200; // Slow metabolism

    setTargetCalories(Math.round(tdee));
  };

  const handleAddFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (foodName && foodCalories) {
      addEntry({ food: foodName, calories: Number(foodCalories) });
      setFoodName('');
      setFoodCalories('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-serif font-bold text-emerald-900">Ayurvedic Calorie Tracker</h1>
        <p className="text-stone-600">Calculate your needs based on your body type and track your daily intake.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calculator Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100">
            <div className="flex items-center gap-2 mb-6 text-emerald-800">
              <Calculator size={24} />
              <h2 className="font-serif text-xl font-bold">Calculate Needs</h2>
            </div>
            
            <form onSubmit={calculateCalories} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Age</label>
                  <input type="number" value={age} onChange={e => setAge(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Gender</label>
                  <select value={gender} onChange={e => setGender(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Weight (kg)</label>
                  <input type="number" value={weight} onChange={e => setWeight(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Height (cm)</label>
                  <input type="number" value={height} onChange={e => setHeight(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Activity Level</label>
                <select value={activity} onChange={e => setActivity(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none">
                  <option value="1.2">Sedentary (little/no exercise)</option>
                  <option value="1.375">Lightly active (1-3 days/week)</option>
                  <option value="1.55">Moderately active (3-5 days/week)</option>
                  <option value="1.725">Very active (6-7 days/week)</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-emerald-100 text-emerald-800 font-medium py-2.5 rounded-xl hover:bg-emerald-200 transition-colors">
                Calculate
              </button>
            </form>

            {dosha && (
              <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-sm">
                <p className="text-emerald-800 font-medium mb-1">Dosha Adjustment Applied: {dosha}</p>
                <p className="text-emerald-600/80">
                  {dosha === 'Vata' ? 'Increased calories for fast metabolism.' : 
                   dosha === 'Kapha' ? 'Decreased calories for slow metabolism.' : 
                   'Standard calories for balanced metabolism.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tracker Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 text-center">
              <p className="text-sm text-stone-500 mb-1">Target</p>
              <p className="text-2xl font-bold text-stone-800">{targetCalories}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-200 text-center">
              <p className="text-sm text-emerald-600 mb-1">Consumed</p>
              <p className="text-2xl font-bold text-emerald-700">{consumed}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-200 text-center">
              <p className="text-sm text-amber-600 mb-1">Remaining</p>
              <p className="text-2xl font-bold text-amber-700">{remaining}</p>
            </div>
          </div>

          {/* Add Food */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100">
            <h3 className="font-serif text-lg font-bold text-emerald-900 mb-4">Log Food</h3>
            <form onSubmit={handleAddFood} className="flex gap-3">
              <input 
                type="text" 
                placeholder="Food name (e.g., Kitchari)" 
                value={foodName}
                onChange={e => setFoodName(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <input 
                type="number" 
                placeholder="Calories" 
                value={foodCalories}
                onChange={e => setFoodCalories(e.target.value)}
                required
                className="w-32 px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <button type="submit" className="bg-emerald-600 text-white px-6 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center">
                <Plus size={20} />
              </button>
            </form>
          </div>

          {/* Today's Log */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100">
            <h3 className="font-serif text-lg font-bold text-emerald-900 mb-4">Today's Intake</h3>
            {todayEntries.length > 0 ? (
              <div className="space-y-3">
                {todayEntries.map(entry => (
                  <div key={entry.id} className="flex justify-between items-center p-3 bg-stone-50 rounded-xl border border-stone-100">
                    <span className="font-medium text-stone-700">{entry.food}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-emerald-700 font-bold">{entry.calories} kcal</span>
                      <button onClick={() => removeEntry(entry.id)} className="text-stone-400 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-stone-500 py-8">No food logged today.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
