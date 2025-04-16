'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

// Simplified visual choices with single-word names
const visualChoicesSet = [
  {
    id: 'beach',
    image: '/visualchoice/beach.png',
    label: 'Beach',
    description: 'Relaxing coastal vibes with golden hour warmth'
  },
  {
    id: 'mountain',
    image: '/visualchoice/mountain.png',
    label: 'Mountain',
    description: 'Rugged terrains and breathtaking natural scenery'
  },
  {
    id: 'city',
    image: '/visualchoice/city.png',
    label: 'City',
    description: 'Urban energy with vibrant night life'
  },
  {
    id: 'forest',
    image: '/visualchoice/forest.png',
    label: 'Forest',
    description: 'Serene woodland escape with lush greenery'
  }
];

export const VisualChoice = ({ onNext, onBack, setVisual }) => {
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovering, setIsHovering] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleSelect = (choice) => {
    setSelected(choice);
    
    // On mobile, auto-continue when a choice is selected
    if (isMobile) {
      setTimeout(() => {
        setVisual(choice);
        onNext();
      }, 500); // Small delay for visual feedback
    }
  };

  const handleSubmit = () => {
    if (selected) {
      setVisual(selected);
      onNext();
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-t-[#00AAFF] border-r-[#B14EFF] border-b-[#00F5D4] border-l-[#FF2A6D] rounded-full animate-spin"></div>
        <p className="mt-4 text-[#A3A8B8] animate-pulse">Loading visual choices...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-xl md:text-xl font-semibold text-[#B14EFF] mb-3">Pick a Visual That Matches Your Vibe</h2>
      </div>

      {/* Visual choice grid - 2x2 on all screen sizes */}
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        {visualChoicesSet.map(choice => (
          <div
            key={choice.id}
            onClick={() => handleSelect(choice)}
            onMouseEnter={() => setIsHovering(choice.id)}
            onMouseLeave={() => setIsHovering(null)}
            className={`group relative cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300 h-40 md:h-64 ${
              selected?.id === choice.id
                ? 'border-[#00AAFF] scale-105 shadow-lg shadow-blue-500/30'
                : 'border-transparent hover:border-[#00AAFF]/60'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
            <img
              src={choice.image}
              alt={choice.label}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Selection indicator */}
            {selected?.id === choice.id && (
              <div className="absolute top-3 right-3 z-20 bg-[#00AAFF]/80 rounded-full p-1">
                <CheckCircle className="text-white" size={16} />
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-20 transform transition-transform duration-300">
              <h3 className="text-[#EEFFFF] font-semibold text-sm md:text-lg mb-1">{choice.label}</h3>
              <p className={`text-[#A3A8B8] text-xs md:text-sm transition-opacity duration-300 ${
                isHovering === choice.id ? 'opacity-100' : 'opacity-0 md:opacity-0'
              }`}>
                {choice.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons - Only show on desktop */}
      <div className="hidden md:flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
        <button
          onClick={onBack}
          className="px-5 py-3 rounded-full bg-[#1A1E2E] border border-[#A3A8B8]/40 text-[#A3A8B8] hover:bg-[#A3A8B8]/10 transition-all duration-300 flex items-center"
        >
          <ArrowLeft size={18} className="mr-2" />
          Go Back
        </button>
        
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center ${
            selected
            ? 'bg-gradient-to-r from-[#00AAFF] to-[#B14EFF] text-white hover:scale-105 shadow-lg shadow-purple-500/20'
            : 'bg-[#1A1E2E] text-[#A3A8B8] cursor-not-allowed'
          }`}
        >
          Continue
          <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
      
      {/* Mobile back button */}
      <div className="flex md:hidden justify-center mt-6">
        <button
          onClick={onBack}
          className="px-5 py-3 rounded-full bg-[#1A1E2E] border border-[#A3A8B8]/40 text-[#A3A8B8] hover:bg-[#A3A8B8]/10 transition-all duration-300 flex items-center"
        >
          <ArrowLeft size={18} className="mr-2" />
          Go Back
        </button>
      </div>
      
      {/* Selected visual feedback - only on desktop */}
      {selected && !isMobile && (
        <div className="hidden md:block text-center mt-2">
          <p className="text-[#00F5D4] text-sm">
            Selected: <span className="font-semibold">{selected.label}</span>
          </p>
        </div>
      )}
    </div>
  );
};