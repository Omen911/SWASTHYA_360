import React, { useState, useEffect } from 'react';
import { Search, Mic, MicOff, AlertTriangle, Heart, Loader2, Plus, X } from 'lucide-react';
import { getAyurvedicRemedy } from '../lib/gemini';
import { useAppStore, useUserStore } from '../store/useStore';
import { cn } from '../lib/utils';
import { COMMON_SYMPTOMS } from '../constants/commonRemedies';

export default function RemedyFinder() {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [severity, setSeverity] = useState<'Mild' | 'Moderate' | 'Severe'>('Mild');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  
  const { addFavorite } = useAppStore();
  const { dosha } = useUserStore();

  // Speech Recognition Setup
  let recognition: any = null;
  if ('webkitSpeechRecognition' in window) {
    recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setCurrentInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
    } else {
      recognition?.start();
      setIsListening(true);
    }
  };

  const handleAddSymptom = (symptom?: string) => {
    const s = symptom || currentInput.trim();
    if (s && !symptoms.includes(s)) {
      setSymptoms([...symptoms, s]);
      if (!symptom) setCurrentInput('');
    }
  };

  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };

  const handleFindRemedy = async () => {
    if (symptoms.length === 0) {
      setError("Please add at least one symptom.");
      return;
    }
    setError('');
    setIsLoading(true);
    setResult(null);

    try {
      const data = await getAyurvedicRemedy(symptoms, severity, dosha || undefined);
      setResult(data);
    } catch (err: any) {
      // Fallback logic: Always try to provide a fallback if API fails
      const matchedSymptom = COMMON_SYMPTOMS.find(s => symptoms.includes(s.name));
      if (matchedSymptom) {
        setResult({
          remedies: [matchedSymptom.remedy],
          generalAdvice: "API is currently unavailable, but here is a common remedy for your symptom. For persistent issues, please consult a professional.",
          consultDoctor: severity === 'Severe'
        });
      } else {
        // Generic fallback if no specific symptom matches
        setResult({
          remedies: COMMON_SYMPTOMS.slice(0, 2).map(s => s.remedy),
          generalAdvice: "API is currently unavailable. Here are some common Ayurvedic remedies. For specific issues, please try again later or consult a professional.",
          consultDoctor: severity === 'Severe'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveFavorite = (remedy: any) => {
    addFavorite({
      id: Date.now().toString(),
      name: remedy.herbName,
      benefits: remedy.benefits
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-serif font-bold text-emerald-900">Smart Remedy Finder</h1>
        <p className="text-stone-600">Enter your symptoms to discover traditional Ayurvedic remedies.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-emerald-100 space-y-6">
        {/* Quick Select */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Quick Select Symptoms</label>
          <div className="flex flex-wrap gap-2">
            {COMMON_SYMPTOMS.map((s) => (
              <button
                key={s.name}
                onClick={() => handleAddSymptom(s.name)}
                className="bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full text-sm hover:bg-emerald-100 transition-colors"
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Input Section */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Or add your own:</label>
          <form onSubmit={(e) => { e.preventDefault(); handleAddSymptom(); }} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="e.g., headache, dry cough, joint pain..."
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
              <button
                type="button"
                onClick={toggleListening}
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors",
                  isListening ? "bg-red-100 text-red-600 animate-pulse" : "text-stone-400 hover:bg-stone-100"
                )}
                title="Voice Input"
              >
                {isListening ? <Mic size={18} /> : <MicOff size={18} />}
              </button>
            </div>
            <button
              type="submit"
              className="bg-emerald-100 text-emerald-700 px-4 py-3 rounded-xl hover:bg-emerald-200 transition-colors font-medium flex items-center gap-2"
            >
              <Plus size={18} /> Add
            </button>
          </form>
        </div>

        {/* Symptoms List */}
        {symptoms.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {symptoms.map((symptom, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 bg-stone-100 text-stone-700 px-3 py-1.5 rounded-full text-sm">
                {symptom}
                <button onClick={() => removeSymptom(symptom)} className="hover:text-red-500 transition-colors">
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Severity Selection */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Severity Level</label>
          <div className="flex gap-3">
            {['Mild', 'Moderate', 'Severe'].map((level) => (
              <button
                key={level}
                onClick={() => setSeverity(level as any)}
                className={cn(
                  "flex-1 py-2.5 rounded-xl font-medium text-sm transition-all border",
                  severity === level 
                    ? level === 'Severe' ? "bg-red-100 border-red-200 text-red-700" : "bg-emerald-600 border-emerald-600 text-white"
                    : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                )}
              >
                {level}
              </button>
            ))}
          </div>
          {severity === 'Severe' && (
            <div className="mt-3 flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
              <AlertTriangle size={18} className="shrink-0 mt-0.5" />
              <p>For severe symptoms, please consult a medical professional immediately. Ayurvedic remedies provided here are for supplementary knowledge.</p>
            </div>
          )}
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          onClick={handleFindRemedy}
          disabled={isLoading || symptoms.length === 0}
          className="w-full bg-emerald-800 text-white py-3.5 rounded-xl font-medium hover:bg-emerald-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
        >
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
          {isLoading ? 'Analyzing Symptoms...' : 'Find Remedies'}
        </button>
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          {result.consultDoctor && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl flex items-start gap-3">
              <AlertTriangle className="shrink-0 text-red-600" size={24} />
              <div>
                <h3 className="font-bold mb-1">Medical Consultation Advised</h3>
                <p className="text-sm">Based on your symptoms and severity, we strongly recommend consulting a doctor.</p>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {result.remedies?.map((remedy: any, idx: number) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-serif font-bold text-emerald-900">{remedy.herbName}</h3>
                  <button 
                    onClick={() => handleSaveFavorite(remedy)}
                    className="text-stone-400 hover:text-red-500 transition-colors p-1"
                    title="Save to Favorites"
                  >
                    <Heart size={20} />
                  </button>
                </div>
                
                <div className="space-y-4 flex-1">
                  <div>
                    <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Benefits</h4>
                    <p className="text-sm text-stone-700">{remedy.benefits}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">How to Use</h4>
                    <p className="text-sm text-stone-700">{remedy.howToUse}</p>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 mt-auto">
                    <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <AlertTriangle size={12} /> Precautions
                    </h4>
                    <p className="text-xs text-amber-900/80">{remedy.precautions}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
            <h3 className="font-serif font-bold text-emerald-900 mb-2">General Advice</h3>
            <p className="text-emerald-800/80 text-sm leading-relaxed">{result.generalAdvice}</p>
          </div>
        </div>
      )}
    </div>
  );
}
