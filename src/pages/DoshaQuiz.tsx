import React, { useState } from 'react';
import { useUserStore, Dosha } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle2, Sun, Moon, Utensils, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { DOSHA_INFO } from '../constants/doshaInfo';

const QUESTIONS = [
  {
    id: 1,
    text: "How would you describe your body frame?",
    options: [
      { text: "Thin, slender, prominent joints", dosha: "Vata" },
      { text: "Medium, athletic, well-proportioned", dosha: "Pitta" },
      { text: "Broad, solid, heavy build", dosha: "Kapha" }
    ]
  },
  {
    id: 2,
    text: "How is your skin generally?",
    options: [
      { text: "Dry, rough, cool to touch", dosha: "Vata" },
      { text: "Warm, oily, prone to acne/freckles", dosha: "Pitta" },
      { text: "Thick, moist, smooth, cool", dosha: "Kapha" }
    ]
  },
  {
    id: 3,
    text: "How is your digestion and appetite?",
    options: [
      { text: "Irregular, sometimes skip meals", dosha: "Vata" },
      { text: "Strong, sharp, get irritable if hungry", dosha: "Pitta" },
      { text: "Slow, steady, can easily skip meals", dosha: "Kapha" }
    ]
  },
  {
    id: 4,
    text: "How do you react to stress?",
    options: [
      { text: "Anxious, worried, fearful", dosha: "Vata" },
      { text: "Irritable, angry, impatient", dosha: "Pitta" },
      { text: "Calm, withdrawn, stubborn", dosha: "Kapha" }
    ]
  },
  {
    id: 5,
    text: "How is your sleep pattern?",
    options: [
      { text: "Light, easily interrupted, insomnia", dosha: "Vata" },
      { text: "Sound, medium length, vivid dreams", dosha: "Pitta" },
      { text: "Deep, heavy, hard to wake up", dosha: "Kapha" }
    ]
  },
  {
    id: 6,
    text: "How would you describe your hair?",
    options: [
      { text: "Dry, brittle, frizzy, thin", dosha: "Vata" },
      { text: "Fine, thinning, premature graying/balding", dosha: "Pitta" },
      { text: "Thick, lustrous, wavy, oily", dosha: "Kapha" }
    ]
  },
  {
    id: 7,
    text: "What are your eyes like?",
    options: [
      { text: "Small, active, dry, nervous blinking", dosha: "Vata" },
      { text: "Piercing, sensitive to light, intense", dosha: "Pitta" },
      { text: "Large, calm, soothing, thick lashes", dosha: "Kapha" }
    ]
  },
  {
    id: 8,
    text: "How are your joints?",
    options: [
      { text: "Thin, crack easily, prone to pain", dosha: "Vata" },
      { text: "Medium, flexible, sometimes inflamed", dosha: "Pitta" },
      { text: "Large, strong, well-lubricated", dosha: "Kapha" }
    ]
  },
  {
    id: 9,
    text: "How is your communication style?",
    options: [
      { text: "Fast, talkative, enthusiastic", dosha: "Vata" },
      { text: "Direct, sharp, persuasive", dosha: "Pitta" },
      { text: "Slow, deliberate, thoughtful", dosha: "Kapha" }
    ]
  },
  {
    id: 10,
    text: "How is your energy level throughout the day?",
    options: [
      { text: "Variable, bursts of energy followed by fatigue", dosha: "Vata" },
      { text: "High, intense, need to stay busy", dosha: "Pitta" },
      { text: "Steady, consistent, slow to start", dosha: "Kapha" }
    ]
  }
];

export default function DoshaQuiz() {
  const { setDosha } = useUserStore();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<Dosha>(null);

  const handleSelect = (dosha: string) => {
    setAnswers({ ...answers, [currentStep]: dosha });
    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    }
  };

  const calculateDosha = () => {
    const counts = { Vata: 0, Pitta: 0, Kapha: 0 };
    Object.values(answers).forEach(dosha => {
      counts[dosha as keyof typeof counts]++;
    });
    
    let maxDosha: Dosha = 'Vata';
    let maxCount = 0;
    
    Object.entries(counts).forEach(([dosha, count]) => {
      if (count > maxCount) {
        maxCount = count;
        maxDosha = dosha as Dosha;
      }
    });
    
    setResult(maxDosha);
    setDosha(maxDosha);
  };

  if (result) {
    const info = DOSHA_INFO[result];
    return (
      <div className="max-w-4xl mx-auto animate-in zoom-in-95 duration-500 pb-20">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-emerald-100">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl text-stone-500 mb-2 text-center">Your dominant Dosha is</h2>
          <h1 className="text-5xl font-serif font-bold text-emerald-900 mb-6 text-center">{info.name}</h1>
          
          <p className="text-stone-700 leading-relaxed mb-10 text-center max-w-2xl mx-auto">{info.description}</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-stone-50 p-6 rounded-2xl">
              <h3 className="font-serif text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Sun size={20} /> Dinacharya (Daily Routine)
              </h3>
              <ul className="space-y-3">
                {info.dinacharya.map((d, i) => (
                  <li key={i} className="flex gap-3 text-sm text-stone-700">
                    <span className="font-bold text-emerald-700 w-16">{d.time}</span>
                    <span>{d.activity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-stone-50 p-6 rounded-2xl">
              <h3 className="font-serif text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Utensils size={20} /> Dietary Tips
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-emerald-800 text-sm mb-1">Eat:</h4>
                  <p className="text-sm text-stone-700">{info.diet.eat.join(', ')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 text-sm mb-1">Avoid:</h4>
                  <p className="text-sm text-stone-700">{info.diet.avoid.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-emerald-50 p-6 rounded-2xl">
            <h3 className="font-serif text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
              <Zap size={20} /> Lifestyle Tips
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {info.tips.map((t, i) => (
                <li key={i} className="text-sm text-emerald-900 bg-white p-3 rounded-lg border border-emerald-100">{t}</li>
              ))}
            </ul>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/')}
              className="bg-emerald-800 text-white px-8 py-3 rounded-xl font-medium hover:bg-emerald-900 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = QUESTIONS[currentStep];

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-serif font-bold text-emerald-900">Discover Your Dosha</h1>
        <p className="text-stone-600">Answer a few questions to find your unique mind-body constitution.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-emerald-100">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-stone-500 mb-2">
            <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
            <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}%</span>
          </div>
          <div className="w-full bg-stone-100 rounded-full h-2">
            <div 
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <h2 className="text-2xl font-serif font-medium text-emerald-900 mb-6">
          {question.text}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(option.dosha)}
              className={cn(
                "w-full text-left p-4 rounded-xl border-2 transition-all duration-200",
                answers[currentStep] === option.dosha 
                  ? "border-emerald-500 bg-emerald-50 text-emerald-900" 
                  : "border-stone-100 hover:border-emerald-200 hover:bg-stone-50 text-stone-700"
              )}
            >
              {option.text}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-stone-100">
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-2 text-stone-500 hover:text-stone-800 disabled:opacity-30 transition-colors font-medium"
          >
            <ArrowLeft size={18} /> Back
          </button>
          
          {currentStep === QUESTIONS.length - 1 ? (
            <button
              onClick={calculateDosha}
              disabled={!answers[currentStep]}
              className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              See Results
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!answers[currentStep]}
              className="flex items-center gap-2 text-emerald-600 hover:text-emerald-800 disabled:opacity-30 transition-colors font-medium"
            >
              Next <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
