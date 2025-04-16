'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft, Users, User, Heart } from 'lucide-react';

// Sample movie pairs that represent different vibes
const moviePairs = [
  {
    id: 1,
    movieA: { title: 'Inception', image: '/images/inception.jpg', vibe: 'Mind-Bending' },
    movieB: { title: 'The Notebook', image: '/images/notebook.jpg', vibe: 'Romantic' }
  },
  {
    id: 2,
    movieA: { title: 'The Dark Knight', image: '/images/dark-knight.jpg', vibe: 'Dark & Intense' },
    movieB: { title: 'La La Land', image: '/images/lalaland.jpg', vibe: 'Musical & Colorful' }
  },
  {
    id: 3,
    movieA: { title: 'Interstellar', image: '/images/interstellar.jpg', vibe: 'Epic Sci-Fi' },
    movieB: { title: 'The Grand Budapest Hotel', image: '/images/grand-budapest.jpg', vibe: 'Quirky & Stylized' }
  },
  {
    id: 4,
    movieA: { title: 'The Matrix', image: '/images/matrix.jpg', vibe: 'Tech Dystopia' },
    movieB: { title: 'Amelie', image: '/images/amelie.jpg', vibe: 'Whimsical & Colorful' }
  },
  {
    id: 5,
    movieA: { title: 'Blade Runner 2049', image: '/images/bladerunner.jpg', vibe: 'Atmospheric Sci-Fi' },
    movieB: { title: 'Coco', image: '/images/coco.jpg', vibe: 'Heartwarming Animation' }
  }
];

// Watching companion options
const watchingOptions = [
  { id: 'alone', label: 'Alone', icon: <User className="text-[#00F5D4] mr-2" size={20} /> },
  { id: 'family', label: 'With Family', icon: <Users className="text-[#B14EFF] mr-2" size={20} /> },
  { id: 'friends', label: 'With Friends', icon: <Heart className="text-[#FF2A6D] mr-2" size={20} /> }
];

export const MovieTinder = ({ onNext, onBack, setMovieTinderChoice }) => {
  const [step, setStep] = useState(1); // 1: Movie choice, 2: Watching companion
  const [selectedMoviePair, setSelectedMoviePair] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCompanion, setSelectedCompanion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Select a random movie pair
    const randomPairIndex = Math.floor(Math.random() * moviePairs.length);
    setSelectedMoviePair(moviePairs[randomPairIndex]);
    setIsLoading(false);
  }, []);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setTimeout(() => {
      setStep(2); // Move to companion selection
    }, 500);
  };

  const handleCompanionSelect = (companion) => {
    setSelectedCompanion(companion);
    
    // Combine selections and pass to parent
    setMovieTinderChoice({
      movieChoice: selectedMovie,
      companion: companion
    });
    
    setTimeout(() => {
      onNext();
    }, 600);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-t-[#00AAFF] border-r-[#B14EFF] border-b-[#00F5D4] border-l-[#FF2A6D] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 animate-fade-in">
      {step === 1 && selectedMoviePair && (
        <>
          <h2 className="text-xl md:text-xl font-semibold text-center text-[#B14EFF]">
            Which Movie Speaks To You?
          </h2>

          {/* Movie choice cards - side by side on desktop, stacked on mobile */}
          <div className="w-full flex flex-col md:flex-row gap-6 justify-center">
            {/* Movie A */}
            <div 
              onClick={() => handleMovieSelect(selectedMoviePair.movieA)}
              className={`relative w-full md:w-2/5 h-80 md:h-96 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                selectedMovie?.title === selectedMoviePair.movieA.title 
                  ? 'border-[#00AAFF] scale-105 shadow-lg shadow-blue-500/20'
                  : 'border-[#00AAFF]/20 hover:border-[#00AAFF]/60'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] to-transparent opacity-80 z-10"></div>
              <img
                src={selectedMoviePair.movieA.image}
                alt={selectedMoviePair.movieA.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-0 right-0 text-center text-[#EEFFFF] font-body z-20">
                <h3 className="text-xl md:text-2xl font-semibold">{selectedMoviePair.movieA.title}</h3>
                <p className="text-sm text-[#00F5D4]">{selectedMoviePair.movieA.vibe}</p>
              </div>
            </div>

            {/* OR divider */}
            <div className="flex items-center justify-center md:py-0 py-2">
              <div className="px-4 py-2 rounded-full bg-[#1A1E2E]/70 border border-[#00AAFF]/30 text-[#EEFFFF] text-sm font-medium">
                OR
              </div>
            </div>

            {/* Movie B */}
            <div 
              onClick={() => handleMovieSelect(selectedMoviePair.movieB)}
              className={`relative w-full md:w-2/5 h-80 md:h-96 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                selectedMovie?.title === selectedMoviePair.movieB.title 
                  ? 'border-[#00AAFF] scale-105 shadow-lg shadow-blue-500/20'
                  : 'border-[#00AAFF]/20 hover:border-[#00AAFF]/60'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] to-transparent opacity-80 z-10"></div>
              <img
                src={selectedMoviePair.movieB.image}
                alt={selectedMoviePair.movieB.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-0 right-0 text-center text-[#EEFFFF] font-body z-20">
                <h3 className="text-xl md:text-2xl font-semibold">{selectedMoviePair.movieB.title}</h3>
                <p className="text-sm text-[#B14EFF]">{selectedMoviePair.movieB.vibe}</p>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={onBack}
              className="px-5 py-3 rounded-full bg-[#1A1E2E] border border-[#A3A8B8]/40 text-[#A3A8B8] hover:bg-[#A3A8B8]/10 transition-all duration-300 flex items-center"
            >
              <ArrowLeft size={18} className="mr-2" />
              Go Back
            </button>
          </div>

          {/* Selection feedback */}
          {selectedMovie && (
            <div className="text-center mt-2 animate-fade-in">
              <p className="text-[#00F5D4] text-sm">
                Selected: <span className="font-semibold">{selectedMovie.title}</span>
              </p>
            </div>
          )}
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-3xl md:text-5xl font-heading text-center text-[#00AAFF]">
            Who Are You Watching With?
          </h2>
          <p className="text-[#A3A8B8] text-sm md:text-base max-w-xl mx-auto text-center">
            This helps us tailor recommendations to your viewing context
          </p>

          {/* Companion selection cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mt-6">
            {watchingOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleCompanionSelect(option.id)}
                className={`relative p-6 rounded-2xl backdrop-blur-md border-2 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-4 ${
                  selectedCompanion === option.id
                    ? 'bg-gradient-to-b from-[#1A1E2E] to-[#0B1026] border-[#00AAFF] shadow-lg shadow-blue-500/20'
                    : 'bg-[#1A1E2E]/60 border-[#00AAFF]/20 hover:border-[#00AAFF]/60'
                }`}
              >
                <div className="text-4xl">{option.icon}</div>
                <h3 className="text-xl font-semibold text-[#EEFFFF]">{option.label}</h3>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-3 rounded-full bg-[#1A1E2E] border border-[#A3A8B8]/40 text-[#A3A8B8] hover:bg-[#A3A8B8]/10 transition-all duration-300 flex items-center"
            >
              <ArrowLeft size={18} className="mr-2" />
              Go Back
            </button>
          </div>

          {/* Selection feedback */}
          {selectedCompanion && (
            <div className="text-center mt-2 animate-fade-in">
              <p className="text-[#00F5D4] text-sm">
                Selected: <span className="font-semibold">
                  {watchingOptions.find(opt => opt.id === selectedCompanion)?.label}
                </span>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};