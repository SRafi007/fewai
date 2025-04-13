'use client';

import React, { useEffect, useState } from 'react';
import { Rocket, Film, Sparkles } from 'lucide-react';

export const MovieOutput = ({ basicPreferences, thisOrThat, movieTinderChoice }) => {
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const generateRecommendation = () => {
      // Simple algorithm using input to determine a theme
      let mood = 'Balanced Explorer';
      let themeColor = '#00AAFF';
      let vibe = 'A well-rounded movie night is in order!';

      if (movieTinderChoice?.liked && movieTinderChoice?.vibe.includes('Thriller')) {
        mood = 'Mind Bender';
        themeColor = '#FF5F9E';
        vibe = 'You love intense, mind-twisting experiences.';
      } else if (thisOrThat?.choice === 'Visual Spectacle') {
        mood = 'Visual Voyager';
        themeColor = '#B14EFF';
        vibe = 'Aesthetics and color thrill you — lets find something stunning.';
      } else if (basicPreferences?.mood === 'Chill') {
        mood = 'Cozy Dreamer';
        themeColor = '#00F5D4';
        vibe = 'Soft stories and warm feels are your jam.';
      }

      return { mood, themeColor, vibe };
    };

    const result = generateRecommendation();
    setRecommendation(result);
  }, [basicPreferences, thisOrThat, movieTinderChoice]);

  if (!recommendation) return null;

  return (
    <div className="animate-fade-in-up flex flex-col items-center gap-10 mt-12 text-center">
      <h2 className="text-4xl md:text-5xl font-heading" style={{ color: recommendation.themeColor }}>
        🎬 Your Movie Vibe: {recommendation.mood}
      </h2>

      <div className="w-full max-w-xl rounded-2xl bg-[#0C0C1E]/80 backdrop-blur-md border border-[#00AAFF]/30 shadow-lg p-6 space-y-4">
        <p className="text-xl text-[#EEFFFF] font-body">
          <Sparkles className="inline-block mr-2 text-pink-400" size={18} />
          {recommendation.vibe}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-left text-[#B0C4DE]">
          <div>
            <h4 className="font-bold text-white mb-1">Your Mood</h4>
            <p>{basicPreferences?.mood || '—'}</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">You Chose</h4>
            <p>{thisOrThat?.choice || '—'}</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">Tinder Vibe</h4>
            <p>{movieTinderChoice?.title || '—'} {movieTinderChoice?.liked ? '💖' : '❌'}</p>
          </div>
        </div>
      </div>

      <button className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-[#00AAFF] to-[#B14EFF] text-white font-semibold hover:scale-105 transition-transform">
        Get Recommendations
      </button>
    </div>
  );
};