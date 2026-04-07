import React from 'react';
import { BookOpen, Leaf, Activity, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-emerald-900">Indian Knowledge Systems</h1>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto">
          Discover the ancient wisdom of Ayurveda, seamlessly integrated with modern technology.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-emerald-100">
        <div className="prose prose-emerald max-w-none">
          <h2 className="font-serif text-3xl text-emerald-800 mb-6">What is Ayurveda?</h2>
          <p className="text-lg text-stone-700 leading-relaxed mb-6">
            Ayurveda, translating to "The Science of Life" in Sanskrit, is a 5,000-year-old natural healing system originating in the Vedic culture of India. It is considered by many scholars to be the oldest healing science.
          </p>
          <p className="text-lg text-stone-700 leading-relaxed mb-8">
            Unlike modern medicine, which primarily focuses on treating symptoms, Ayurveda focuses on the root cause of illness and promotes maintaining health through a balance of mind, body, and consciousness.
          </p>

          <h3 className="font-serif text-2xl text-emerald-800 mb-4 mt-8">The Three Doshas</h3>
          <p className="text-stone-700 mb-6">
            According to Ayurveda, everything in the universe is made of five elements: Space, Air, Fire, Water, and Earth. These elements combine in the human body to form three life forces or energies, called Doshas.
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h4 className="font-bold text-xl text-blue-800 mb-2">Vata (Space & Air)</h4>
              <p className="text-sm text-blue-900/80">Controls bodily functions associated with motion, including blood circulation, breathing, blinking, and heartbeat.</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
              <h4 className="font-bold text-xl text-orange-800 mb-2">Pitta (Fire & Water)</h4>
              <p className="text-sm text-orange-900/80">Controls the body's metabolic systems, including digestion, absorption, nutrition, and your body's temperature.</p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
              <h4 className="font-bold text-xl text-emerald-800 mb-2">Kapha (Earth & Water)</h4>
              <p className="text-sm text-emerald-900/80">Controls growth in the body. It supplies water to all body parts, moisturizes the skin, and maintains the immune system.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-emerald-800 text-white p-8 rounded-3xl">
          <Leaf className="mb-4 text-emerald-300" size={32} />
          <h3 className="text-2xl font-serif font-bold mb-3">Herbal Remedies</h3>
          <p className="text-emerald-100 leading-relaxed">
            Ayurveda relies heavily on herbs and plants to restore balance. Common herbs like Ashwagandha, Turmeric, Tulsi, and Neem have been used for millennia to treat various ailments and boost overall vitality.
          </p>
        </div>
        <div className="bg-stone-800 text-white p-8 rounded-3xl">
          <Activity className="mb-4 text-stone-300" size={32} />
          <h3 className="text-2xl font-serif font-bold mb-3">Diet & Lifestyle</h3>
          <p className="text-stone-300 leading-relaxed">
            A core principle is that "food is medicine." Your ideal diet depends on your dominant Dosha. Daily routines (Dinacharya) including yoga, meditation, and proper sleep are essential for maintaining harmony.
          </p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
        <p className="text-amber-800 font-medium">
          <strong>Disclaimer:</strong> Swasthya 360 is an educational tool designed to spread awareness about Indian Knowledge Systems. The AI-generated remedies and suggestions should not replace professional medical advice. Always consult a qualified healthcare provider for serious medical conditions.
        </p>
      </div>
    </div>
  );
}
