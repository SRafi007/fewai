'use client';

import React, { useEffect, useState } from 'react';
import { Eye, ArrowLeft, ArrowRight, RefreshCw, CheckCircle } from 'lucide-react';

const visualChoicesSet = [
  {
    id: 'epic-space',
    image: '/visuals/epic-space.jpg',
    label: 'Epic & Spacey',
    description: 'Vast cosmic landscapes and interstellar adventures'
  },
  {
    id: 'romantic-dream',
    image: '/visuals/romantic-dream.jpg',
    label: 'Romantic & Dreamy',
    description: 'Tender moments and heartfelt connections'
  },
  {
    id: 'chill-vibes',
    image: '/visuals/chill-vibes.jpg',
    label: 'Chill & Lo-Fi',
    description: 'Relaxed atmosphere and soothing experiences'
  },
  {
    id: 'retro-action',
    image: '/visuals/retro-action.jpg',
    label: 'Retro Action',
    description: 'Classic thrills and nostalgic adventures'
  },
  {
    id: 'neon-horror',
    image: '/visuals/neon-horror.jpg',
    label: 'Neon Horror',
    description: 'Stylized terror with a vibrant aesthetic'
  },
  {
    id: 'urban-grit',
    image: '/visuals/urban-grit.jpg',
    label: 'Urban & Gritty',
    description: 'Raw city tales with authentic atmosphere'
  },
  {
    id: 'whimsical-fantasy',
    image: '/visuals/whimsical-fantasy.jpg',
    label: 'Whimsical Fantasy',
    description: 'Magical worlds filled with wonder and imagination'
  },
  {
    id: 'tech-noir',
    image: '/visuals/tech-noir.jpg',
    label: 'Tech Noir',
    description: 'Futuristic dystopias with neon-lit shadows'
  }
];

export const VisualChoice = ({ onNext, onBack, setVisual }) => {
  const [selected, setSelected] = useState(null);
  const [randomChoices, setRandomChoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(null);

  // Get a random set of visual choices
  const getRandomChoices = () => {
    setIsLoading(true);
    const shuffled = [...visualChoicesSet].sort(() => 0.5 - Math.random());
    // Get 6 random choices for larger screens, but we'll only show 3 at a time on mobile
    const selectedChoices = shuffled.slice(0, 6);
    setRandomChoices(selectedChoices);
    setTimeout(() => setIsLoading(false), 600); // Simulate loading for effect
  };

  useEffect(() => {
    getRandomChoices();
  }, []);

  const handleSubmit = () => {
    if (selected) {
      setVisual(selected);
      onNext();
    }
  };

  const handleRefresh = () => {
    setSelected(null);
    getRandomChoices();
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
        <h2 className="text-3xl md:text-5xl font-heading text-[#B14EFF] mb-3">Pick a Visual That Matches Your Vibe</h2>
        <p className="text-[#A3A8B8] text-sm md:text-base max-w-xl mx-auto">
          Select an image that resonates with the type of movie experience you're seeking
        </p>
      </div>

      {/* Visual choice grid - 3 columns on desktop, single item on mobile with navigation */}
      <div className="relative">
        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {randomChoices.slice(0, 6).map(choice => (
            <div
              key={choice.id}
              onClick={() => setSelected(choice)}
              onMouseEnter={() => setIsHovering(choice.id)}
              onMouseLeave={() => setIsHovering(null)}
              className={`group relative cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300 h-64 ${
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
                  <CheckCircle className="text-white" size={20} />
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform transition-transform duration-300">
                <h3 className="text-[#EEFFFF] font-semibold text-lg mb-1">{choice.label}</h3>
                <p className={`text-[#A3A8B8] text-sm transition-opacity duration-300 ${isHovering === choice.id ? 'opacity-100' : 'opacity-0'}`}>
                  {choice.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile Carousel View */}
        <div className="md:hidden">
          <div className="relative rounded-2xl overflow-hidden border-2 h-80 mx-auto transition-all duration-300 
            shadow-lg shadow-blue-500/20 backdrop-blur-md
            border-[#00AAFF]/40">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
            
            {randomChoices.length > 0 && (
              <img
                src={randomChoices[0].image}
                alt={randomChoices[0].label}
                className="w-full h-full object-cover"
              />
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
              <h3 className="text-[#EEFFFF] font-semibold text-xl mb-2">
                {randomChoices.length > 0 && randomChoices[0].label}
              </h3>
              <p className="text-[#A3A8B8] text-sm">
                {randomChoices.length > 0 && randomChoices[0].description}
              </p>
            </div>
            
            <div className="absolute top-2 right-2 z-20">
              <button 
                onClick={() => setSelected(randomChoices[0])}
                className={`p-2 rounded-full transition-all duration-300 ${
                  selected?.id === randomChoices[0]?.id 
                  ? 'bg-[#00AAFF] text-white' 
                  : 'bg-black/50 text-white/70 hover:bg-black/70'
                }`}
              >
                {selected?.id === randomChoices[0]?.id ? <CheckCircle size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation Buttons */}
          <div className="flex justify-center mt-4 gap-3">
            <button 
              onClick={() => {
                const rotated = [...randomChoices];
                rotated.push(rotated.shift());
                setRandomChoices(rotated);
              }}
              className="p-3 rounded-full bg-[#1A1E2E] border border-[#00AAFF]/40 text-[#00AAFF] hover:bg-[#00AAFF]/10"
            >
              <ArrowLeft size={20} />
            </button>
            
            <button
              onClick={() => setSelected(randomChoices[0])}
              className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center ${
                selected?.id === randomChoices[0]?.id
                ? 'bg-gradient-to-r from-[#00AAFF] to-[#B14EFF] text-white'
                : 'bg-[#1A1E2E] border border-[#00AAFF]/40 text-[#00AAFF]'
              }`}
            >
              {selected?.id === randomChoices[0]?.id ? 'Selected' : 'Select This'}
            </button>
            
            <button 
              onClick={() => {
                const rotated = [...randomChoices];
                rotated.unshift(rotated.pop());
                setRandomChoices(rotated);
              }}
              className="p-3 rounded-full bg-[#1A1E2E] border border-[#00AAFF]/40 text-[#00AAFF] hover:bg-[#00AAFF]/10"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
        <button
          onClick={handleRefresh}
          className="px-5 py-3 rounded-full bg-[#1A1E2E] border border-[#00F5D4]/40 text-[#00F5D4] hover:bg-[#00F5D4]/10 transition-all duration-300 flex items-center"
        >
          <RefreshCw size={18} className="mr-2" />
          New Options
        </button>
        
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
      
      {/* Selected visual feedback */}
      {selected && (
        <div className="text-center mt-2">
          <p className="text-[#00F5D4] text-sm">
            Selected: <span className="font-semibold">{selected.label}</span>
          </p>
        </div>
      )}
    </div>
  );
};