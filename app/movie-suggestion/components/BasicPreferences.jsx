'use client';

import React, { useState, useEffect } from 'react';
import { Film, Coffee, Globe, Check, ChevronDown, X } from 'lucide-react';

export const BasicPreferences = ({ onNext, setPreferences, initialPreferences = {} }) => {
  const [genre, setGenre] = useState(initialPreferences.genre || []);
  const [mood, setMood] = useState(initialPreferences.mood || '');
  const [language, setLanguage] = useState(initialPreferences.language || '');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [formComplete, setFormComplete] = useState(false);

  const genres = [
    { id: 'action', name: 'Action', icon: '🔥' },
    { id: 'romance', name: 'Romance', icon: '💖' },
    { id: 'thriller', name: 'Thriller', icon: '🔍' },
    { id: 'comedy', name: 'Comedy', icon: '😂' },
    { id: 'scifi', name: 'Sci-Fi', icon: '🚀' },
    { id: 'fantasy', name: 'Fantasy', icon: '🧙' },
    { id: 'horror', name: 'Horror', icon: '👻' },
    { id: 'drama', name: 'Drama', icon: '🎭' }
  ];
  
  const moods = [
    { id: 'excited', name: 'Excited', icon: '⚡', color: '#FF2A6D' },
    { id: 'sad', name: 'Melancholic', icon: '💧', color: '#3A0CA3' },
    { id: 'inspired', name: 'Inspired', icon: '💫', color: '#B14EFF' },
    { id: 'chill', name: 'Relaxed', icon: '🌊', color: '#00F5D4' },
    { id: 'adventurous', name: 'Adventurous', icon: '🧭', color: '#00AAFF' }
  ];
  
  const languages = [
    { id: 'english', name: 'English', flag: '🇺🇸' },
    { id: 'spanish', name: 'Spanish', flag: '🇪🇸' },
    { id: 'french', name: 'French', flag: '🇫🇷' },
    { id: 'japanese', name: 'Japanese', flag: '🇯🇵' },
    { id: 'hindi', name: 'Hindi', flag: '🇮🇳' },
    { id: 'korean', name: 'Korean', flag: '🇰🇷' },
    { id: 'chinese', name: 'Chinese', flag: '🇨🇳' },
    { id: 'german', name: 'German', flag: '🇩🇪' },
    { id: 'italian', name: 'Italian', flag: '🇮🇹' }
  ];

  useEffect(() => {
    // Check if all required fields are filled
    setFormComplete(genre.length > 0 && mood && language);
  }, [genre, mood, language]);

  const toggleGenre = (g) => {
    if (genre.includes(g)) {
      setGenre(prev => prev.filter(item => item !== g));
    } else {
      // Limit to 3 selections
      if (genre.length < 3) {
        setGenre(prev => [...prev, g]);
      }
    }
  };

  const handleSubmit = () => {
    if (formComplete) {
      setPreferences({ genre, mood, language });
      onNext();
    }
  };

  const selectedLanguageObj = languages.find(lang => lang.id === language);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-heading text-[#00AAFF] mb-3">Let's Get To Know You</h2>
        <p className="text-[#A3A8B8] text-sm md:text-base max-w-xl mx-auto">
          Help our AI understand your taste by sharing your preferences
        </p>
      </div>

      {/* Genres Section */}
      <div className="bg-[#1A1E2E]/90 rounded-2xl p-6 shadow-lg shadow-blue-500/20 backdrop-blur-md border border-[#00AAFF]/20 transition-all hover:border-[#00AAFF]/40">
        <div className="flex items-center mb-4">
          <Film className="text-[#00F5D4] mr-2" size={20} />
          <h3 className="text-xl font-semibold text-[#EEFFFF]">Pick Your Top Genres <span className="text-sm font-normal text-[#A3A8B8]">(up to 3)</span></h3>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {genres.map(g => (
            <button
              key={g.id}
              onClick={() => toggleGenre(g.id)}
              className={`px-4 py-3 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                genre.includes(g.id)
                  ? 'bg-gradient-to-r from-[#00AAFF]/30 to-[#B14EFF]/30 border-[#00AAFF] text-white'
                  : 'bg-[#1A1E2E] border-gray-700 text-[#EEFFFF] hover:border-[#00AAFF]/70'
              }`}
            >
              <span className="flex items-center">
                <span className="mr-2">{g.icon}</span>
                {g.name}
              </span>
              {genre.includes(g.id) && <Check size={16} className="text-[#00F5D4]" />}
            </button>
          ))}
        </div>
        
        {genre.length === 0 && (
          <p className="text-xs text-[#A3A8B8] mt-2">Please select at least one genre</p>
        )}
      </div>

      {/* Moods Section */}
      <div className="bg-[#1A1E2E]/90 rounded-2xl p-6 shadow-lg shadow-blue-500/20 backdrop-blur-md border border-[#00AAFF]/20 transition-all hover:border-[#00AAFF]/40">
        <div className="flex items-center mb-4">
          <Coffee className="text-[#FF2A6D] mr-2" size={20} />
          <h3 className="text-xl font-semibold text-[#EEFFFF]">What's Your Mood Today?</h3>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {moods.map(m => (
            <button
              key={m.id}
              onClick={() => setMood(m.id)}
              style={{
                borderColor: mood === m.id ? m.color : 'transparent',
                background: mood === m.id ? `linear-gradient(to right, ${m.color}20, ${m.color}30)` : ''
              }}
              className={`px-3 py-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center ${
                mood === m.id
                  ? 'text-white shadow-lg'
                  : 'bg-[#1A1E2E] text-[#EEFFFF] hover:border-gray-600'
              }`}
            >
              <span className="text-2xl mb-2">{m.icon}</span>
              <span className="text-sm">{m.name}</span>
            </button>
          ))}
        </div>
        
        {!mood && (
          <p className="text-xs text-[#A3A8B8] mt-2">Please select your current mood</p>
        )}
      </div>

      {/* Language Section - Table Popup Style */}
      <div className="bg-[#1A1E2E]/90 rounded-2xl p-6 shadow-lg shadow-blue-500/20 backdrop-blur-md border border-[#00AAFF]/20 transition-all hover:border-[#00AAFF]/40">
        <div className="flex items-center mb-4">
          <Globe className="text-[#B14EFF] mr-2" size={20} />
          <h3 className="text-xl font-semibold text-[#EEFFFF]">Preferred Language</h3>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="w-full p-4 bg-[#0A0C18] text-left text-[#EEFFFF] rounded-xl border border-blue-400 focus:ring-2 focus:ring-blue-400/50 flex justify-between items-center"
          >
            {selectedLanguageObj ? (
              <span className="flex items-center">
                <span className="mr-2 text-xl">{selectedLanguageObj.flag}</span>
                {selectedLanguageObj.name}
              </span>
            ) : (
              <span className="text-[#A3A8B8]">Select a language</span>
            )}
            <ChevronDown size={18} className={`transition-transform duration-300 ${showLanguageDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Table-shaped language dropdown */}
          {showLanguageDropdown && (
            <div className="absolute z-10 mt-2 w-full bg-[#0A0C18]/95 backdrop-blur-md border border-[#00AAFF]/30 rounded-xl shadow-xl shadow-blue-500/20 p-2 animate-fade-in-down">
              <div className="flex justify-between items-center mb-2 px-2">
                <h4 className="text-sm font-medium text-[#00F5D4]">Select Language</h4>
                <button 
                  onClick={() => setShowLanguageDropdown(false)}
                  className="text-[#A3A8B8] hover:text-[#EEFFFF]"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 max-h-60 overflow-y-auto">
                {languages.map(lang => (
                  <button
                    key={lang.id}
                    onClick={() => {
                      setLanguage(lang.id);
                      setShowLanguageDropdown(false);
                    }}
                    className={`px-3 py-2 rounded-lg flex items-center text-left transition-all ${
                      language === lang.id 
                        ? 'bg-[#3A0CA3]/40 text-[#EEFFFF]' 
                        : 'hover:bg-[#1A1E2E] text-[#A3A8B8]'
                    }`}
                  >
                    <span className="text-xl mr-2">{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {!language && !showLanguageDropdown && (
            <p className="text-xs text-[#A3A8B8] mt-2">Please select your preferred language</p>
          )}
        </div>
      </div>

      {/* Continue Button with Animation */}
      <div className="text-center pt-4">
        <button
          onClick={handleSubmit}
          disabled={!formComplete}
          className={`px-8 py-4 rounded-full text-lg transition-all duration-300 ${
            formComplete 
            ? 'bg-gradient-to-r from-[#00AAFF] to-[#B14EFF] text-white hover:scale-105 shadow-lg shadow-purple-500/20'
            : 'bg-[#1A1E2E] text-[#A3A8B8] cursor-not-allowed'
          }`}
        >
          {formComplete ? 'Continue' : 'Please complete all fields'}
        </button>
      </div>
      
      {/* Selection Summary */}
      {(genre.length > 0 || mood || language) && (
        <div className="text-center mt-4">
          <p className="text-xs text-[#A3A8B8]">
            Your selections: 
            {genre.length > 0 && (
              <span className="ml-1 text-[#00F5D4]">
                {genre.map(g => genres.find(item => item.id === g)?.name).join(', ')}
              </span>
            )}
            {mood && (
              <span className="ml-1 text-[#B14EFF]">
                {" • "}{moods.find(m => m.id === mood)?.name}
              </span>
            )}
            {language && (
              <span className="ml-1 text-[#FF2A6D]">
                {" • "}{languages.find(l => l.id === language)?.name}
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};