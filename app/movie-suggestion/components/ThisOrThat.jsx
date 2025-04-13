'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, RefreshCw, Sparkles, Sliders } from 'lucide-react';

const thisOrThatPairsSets = [
  // Set 1: Pacing and Structure
  [
    { id: 1, optionA: 'Story-driven', optionB: 'Visual Spectacle', icon: '📖 vs 🎬' },
    { id: 2, optionA: 'Slow Burn', optionB: 'Fast Paced', icon: '🐢 vs 🐇' },
    { id: 3, optionA: 'Linear Timeline', optionB: 'Non-linear Narrative', icon: '📏 vs 🔄' },
    { id: 4, optionA: 'Dialogue Heavy', optionB: 'Action Oriented', icon: '💬 vs 💥' },
    { id: 5, optionA: 'Minimalist', optionB: 'Maximalist', icon: '➖ vs ➕' }
  ],
  
  // Set 2: Emotional Tone
  [
    { id: 6, optionA: 'Feel Good', optionB: 'Mind-Bending', icon: '😊 vs 🤯' },
    { id: 7, optionA: 'Happy Ending', optionB: 'Thought-Provoking End', icon: '🌈 vs 💭' },
    { id: 8, optionA: 'Lighthearted', optionB: 'Intense', icon: '🎭 vs 🔥' },
    { id: 9, optionA: 'Hopeful', optionB: 'Melancholic', icon: '⭐ vs 🌧️' },
    { id: 10, optionA: 'Uplifting', optionB: 'Dark & Gritty', icon: '☀️ vs 🌑' }
  ],
  
  // Set 3: Aesthetics and Eras
  [
    { id: 11, optionA: 'Old School', optionB: 'Modern Vibes', icon: '📼 vs 📱' },
    { id: 12, optionA: 'Realistic', optionB: 'Stylized', icon: '📷 vs 🎨' },
    { id: 13, optionA: 'Natural Colors', optionB: 'Vibrant Palette', icon: '🌿 vs 🌈' },
    { id: 14, optionA: 'Period Piece', optionB: 'Contemporary', icon: '⏳ vs 📅' },
    { id: 15, optionA: 'Classic Cinematography', optionB: 'Experimental Visuals', icon: '🎞️ vs 🔬' }
  ]
];

export const ThisOrThat = ({ onNext, onBack, setThisOrThat }) => {
  const [pairSet, setPairSet] = useState(0);
  const [currentPair, setCurrentPair] = useState(null);
  const [selected, setSelected] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pairHistory, setPairHistory] = useState([]);
  const [showNext, setShowNext] = useState(false);

  // Choose a random pair set and a random pair from that set
  const selectRandomPair = () => {
    // Randomly select one of the three pair sets
    const randomSetIndex = Math.floor(Math.random() * thisOrThatPairsSets.length);
    setPairSet(randomSetIndex);
    
    // Get available pairs (exclude previously shown pairs)
    const availablePairs = thisOrThatPairsSets[randomSetIndex].filter(
      pair => !pairHistory.includes(pair.id)
    );
    
    // If all pairs have been shown, reset history
    if (availablePairs.length === 0) {
      setPairHistory([]);
      const randomPair = thisOrThatPairsSets[randomSetIndex][
        Math.floor(Math.random() * thisOrThatPairsSets[randomSetIndex].length)
      ];
      setCurrentPair(randomPair);
      return;
    }
    
    // Select a random pair from available pairs
    const randomPair = availablePairs[
      Math.floor(Math.random() * availablePairs.length)
    ];
    
    setCurrentPair(randomPair);
    setPairHistory(prev => [...prev, randomPair.id]);
  };

  useEffect(() => {
    selectRandomPair();
  }, []);

  const handleSelect = (choice, option) => {
    setIsAnimating(true);
    setSelected(option);
    setShowNext(true);
    
    // Slight delay to show animation before enabling next button
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleRefresh = () => {
    setSelected(null);
    setShowNext(false);
    setIsAnimating(true);
    setTimeout(() => {
      selectRandomPair();
      setIsAnimating(false);
    }, 400);
  };

  const handleSubmit = () => {
    if (selected) {
      setThisOrThat({ id: currentPair.id, choice: selected });
      onNext();
    }
  };

  if (!currentPair) return null;

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-5xl font-heading text-[#FF2A6D] mb-3">Choose Your Preference</h2>
        <p className="text-[#A3A8B8] text-sm md:text-base max-w-xl mx-auto">
          Help us understand your taste by selecting which option appeals more to you
        </p>
      </div>

      {/* This or That icon */}
      <div className="flex justify-center">
        <div className="bg-[#1A1E2E]/70 rounded-full py-2 px-6 flex items-center shadow-lg shadow-[#FF2A6D]/10">
          <Sliders className="text-[#FF2A6D] mr-2" size={18} />
          <span className="text-[#EEFFFF] text-sm font-medium">{currentPair.icon}</span>
        </div>
      </div>

      {/* The core choice component - adapts to mobile and desktop */}
      <div className={`flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-10 transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
        {[
          { key: 'A', option: currentPair.optionA, color: '#00F5D4' },
          { key: 'B', option: currentPair.optionB, color: '#B14EFF' }
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => handleSelect(item.key, item.option)}
            disabled={isAnimating}
            className={`relative group rounded-2xl border-2 transition-all duration-500 p-8 min-h-32 md:min-h-60 flex flex-col justify-center items-center w-full md:w-1/3 ${
              selected === item.option
                ? `border-[${item.color}] bg-gradient-to-b from-[${item.color}]/10 to-[${item.color}]/5`
                : 'border-gray-700 bg-[#1A1E2E]/80 hover:border-gray-500'
            }`}
          >
            {/* Option Letter Badge */}
            <div className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              selected === item.option
                ? `bg-[${item.color}] text-[#1A1E2E]`
                : 'bg-[#1A1E2E] text-[#A3A8B8] border border-gray-700'
            }`}>
              {item.key}
            </div>
            
            {/* Glow effect when selected */}
            {selected === item.option && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-[#00AAFF]/20 to-transparent animate-glow-slide"></div>
            )}
            
            <div className="text-center">
              <h3 className={`text-2xl md:text-3xl font-heading mb-2 transition-colors duration-300 ${
                selected === item.option ? `text-[${item.color}]` : 'text-[#EEFFFF]'
              }`}>
                {item.option}
              </h3>
              
              {/* Sparkles animation when selected */}
              {selected === item.option && (
                <Sparkles className="text-[#EEFFFF]/70 mx-auto mt-4" size={20} />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
        <button
          onClick={handleRefresh}
          className="px-5 py-3 rounded-full bg-[#1A1E2E] border border-[#00F5D4]/40 text-[#00F5D4] hover:bg-[#00F5D4]/10 transition-all duration-300 flex items-center"
          disabled={isAnimating}
        >
          <RefreshCw size={18} className="mr-2" />
          New Options
        </button>
        
        <button
          onClick={onBack}
          className="px-5 py-3 rounded-full bg-[#1A1E2E] border border-[#A3A8B8]/40 text-[#A3A8B8] hover:bg-[#A3A8B8]/10 transition-all duration-300 flex items-center"
          disabled={isAnimating}
        >
          <ArrowLeft size={18} className="mr-2" />
          Go Back
        </button>
        
        <button
          onClick={handleSubmit}
          disabled={!selected || isAnimating}
          className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center ${
            selected && !isAnimating
            ? 'bg-gradient-to-r from-[#00AAFF] to-[#B14EFF] text-white hover:scale-105 shadow-lg shadow-purple-500/20'
            : 'bg-[#1A1E2E] text-[#A3A8B8] cursor-not-allowed'
          }`}
        >
          Continue
          <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
      
      {/* Selected preference feedback */}
      {selected && showNext && (
        <div className="text-center mt-2 animate-fade-in">
          <p className="text-[#A3A8B8] text-sm">
            You selected: <span className="text-[#EEFFFF] font-semibold">{selected}</span>
          </p>
        </div>
      )}
    </div>
  );
};