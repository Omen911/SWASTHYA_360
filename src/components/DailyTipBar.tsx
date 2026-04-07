import React, { useState, useEffect } from 'react';
import { X, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';

const TIPS = [
  { hi: "जल ही जीवन है। सुबह उठकर तांबे के बर्तन का पानी पिएं।", en: "Water is life. Drink water from a copper vessel in the morning." },
  { hi: "भोजन के तुरंत बाद पानी न पिएं।", en: "Do not drink water immediately after meals." },
  { hi: "तुलसी का सेवन रोग प्रतिरोधक क्षमता बढ़ाता है।", en: "Consuming Tulsi boosts immunity." },
  { hi: "हल्दी वाला दूध सूजन कम करने में मदद करता है।", en: "Turmeric milk helps reduce inflammation." },
  { hi: "योग और प्राणायाम मानसिक शांति देते हैं।", en: "Yoga and Pranayama provide mental peace." }
];

export default function DailyTipBar() {
  const [tip, setTip] = useState(TIPS[0]);
  const [isMinimized, setIsMinimized] = useState(false);

  const refreshTip = () => {
    const newTip = TIPS[Math.floor(Math.random() * TIPS.length)];
    setTip(newTip);
  };

  useEffect(() => {
    refreshTip();
  }, []);

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-emerald-800 text-emerald-50 shadow-lg transition-all duration-300 z-50",
      isMinimized ? "translate-y-[calc(100%-40px)]" : "translate-y-0"
    )}>
      <div className="flex items-center justify-between px-4 py-2 bg-emerald-900/50">
        <span className="font-semibold text-sm flex items-center gap-2">
          🌿 Daily Ayurvedic Tip
        </span>
        <div className="flex items-center gap-2">
          <button onClick={refreshTip} className="p-1 hover:bg-emerald-700 rounded-full transition-colors" title="Refresh Tip">
            <RefreshCw size={16} />
          </button>
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-emerald-700 rounded-full transition-colors">
            {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>
      
      <div className="p-4 flex flex-col items-center justify-center text-center">
        <p className="text-lg font-medium mb-1 font-serif">{tip.hi}</p>
        <p className="text-sm text-emerald-200/90">{tip.en}</p>
        <p className="text-xs text-emerald-400 mt-2 font-semibold">— Dash Ayurveda</p>
      </div>
    </div>
  );
}
