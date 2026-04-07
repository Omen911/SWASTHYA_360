import React, { useState, useRef } from 'react';
import { Camera, Upload, Leaf, AlertTriangle, ExternalLink, RefreshCw } from 'lucide-react';
import { analyzeHerbImage } from '../lib/gemini';
import { cn } from '../lib/utils';

export default function HerbScanner() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setError('');
        analyzeImage(reader.result as string, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (base64Image: string, mimeType: string) => {
    setIsAnalyzing(true);
    setResult(null);
    try {
      const data = await analyzeHerbImage(base64Image, mimeType);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetScanner = () => {
    setImage(null);
    setResult(null);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-serif font-bold text-emerald-900">Intelligent Herb Scanner</h1>
        <p className="text-stone-600">Upload or capture a photo of a plant to identify its Ayurvedic properties.</p>
      </div>

      {!image ? (
        <div className="bg-white rounded-3xl p-8 md:p-16 shadow-sm border-2 border-dashed border-emerald-200 text-center">
          <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera size={40} />
          </div>
          <h2 className="text-2xl font-serif font-medium text-emerald-900 mb-2">Scan a Plant</h2>
          <p className="text-stone-500 mb-8 max-w-md mx-auto">
            Take a clear photo of the leaves, flowers, or stem for best results.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Upload size={20} /> Upload Image
            </button>
            <input 
              type="file" 
              accept="image/*" 
              capture="environment"
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
          </div>
          {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Preview */}
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-emerald-100 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden bg-stone-100 aspect-[4/3] flex-shrink-0">
              <img src={image} alt="Scanned plant" className="w-full h-full object-cover" />
              
              {isAnalyzing && (
                <div className="absolute inset-0 bg-emerald-900/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 border-4 border-emerald-500/30 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-emerald-400 rounded-full border-t-transparent animate-spin"></div>
                    <Leaf className="absolute inset-0 m-auto text-emerald-300 animate-pulse" size={24} />
                  </div>
                  <p className="font-medium text-lg tracking-wide">Analyzing using AI...</p>
                  <div className="w-48 h-1.5 bg-emerald-900/50 rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full animate-[progress_2s_ease-in-out_infinite]"></div>
                  </div>
                </div>
              )}
            </div>
            
            <button 
              onClick={resetScanner}
              disabled={isAnalyzing}
              className="mt-4 flex items-center justify-center gap-2 text-stone-500 hover:text-emerald-700 py-2 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} /> Scan Another Plant
            </button>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {isAnalyzing ? (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-100 h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-stone-100 rounded-full animate-pulse"></div>
                <div className="w-3/4 h-6 bg-stone-100 rounded-full animate-pulse"></div>
                <div className="w-1/2 h-4 bg-stone-100 rounded-full animate-pulse"></div>
                <div className="w-full h-24 bg-stone-100 rounded-xl animate-pulse mt-4"></div>
              </div>
            ) : result ? (
              <div className="animate-in slide-in-from-right-8 duration-500 space-y-6">
                {!result.isPlant ? (
                  <div className="bg-amber-50 border border-amber-200 text-amber-800 p-6 rounded-2xl flex flex-col items-center text-center">
                    <AlertTriangle size={32} className="text-amber-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Not a Plant</h3>
                    <p>The AI could not identify a plant in this image. Please try scanning a clear photo of leaves or flowers.</p>
                  </div>
                ) : (
                  <>
                    {/* Best Match */}
                    {result.matches?.[0] && (
                      <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h2 className="text-2xl font-serif font-bold text-emerald-900">{result.matches[0].name}</h2>
                            <p className="text-stone-500 italic">{result.matches[0].scientificName}</p>
                          </div>
                          <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold border border-emerald-200">
                            {result.matches[0].confidence}% Match
                          </div>
                        </div>

                        {result.matches[0].confidence < 60 && (
                          <div className="bg-amber-50 text-amber-800 p-3 rounded-xl text-sm flex items-start gap-2 mb-4 border border-amber-200">
                            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                            <p>Identification is uncertain. Please verify manually or consult an expert before use.</p>
                          </div>
                        )}

                        <div className="space-y-4">
                          <div>
                            <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Ayurvedic History</h4>
                            <p className="text-sm text-stone-700">{result.matches[0].history}</p>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Uses & Benefits</h4>
                            <p className="text-sm text-stone-700">{result.matches[0].benefits}</p>
                          </div>
                          <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                            <h4 className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                              <AlertTriangle size={12} /> Precautions
                            </h4>
                            <p className="text-xs text-stone-600">{result.matches[0].precautions}</p>
                          </div>
                          
                          <a 
                            href={result.matches[0].wikipediaUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Read more on Wikipedia <ExternalLink size={14} />
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Other Matches */}
                    {result.matches?.length > 1 && (
                      <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200">
                        <h3 className="font-serif font-bold text-stone-800 mb-4">Other Possible Matches</h3>
                        <div className="space-y-3">
                          {result.matches.slice(1).map((match: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center p-3 hover:bg-stone-50 rounded-xl transition-colors border border-transparent hover:border-stone-100">
                              <div>
                                <p className="font-medium text-stone-800">{match.name}</p>
                                <p className="text-xs text-stone-500 italic">{match.scientificName}</p>
                              </div>
                              <span className="text-sm font-medium text-stone-500 bg-stone-100 px-2 py-1 rounded-md">
                                {match.confidence}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
