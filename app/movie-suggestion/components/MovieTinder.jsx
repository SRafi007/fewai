'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Heart, X, Info, Star, ArrowLeft, ArrowRight } from 'lucide-react';

// Enhanced movie cards with more metadata
const movieTinderCards = [
  { 
    id: 1, 
    title: 'Epic Space', 
    image: '/images/space1.jpg', 
    vibe: 'Sci-Fi Adventure',
    genre: 'Science Fiction',
    year: '2023',
    rating: 4.8
  },
  { 
    id: 2, 
    title: 'Chill Nights', 
    image: '/images/chill1.jpg', 
    vibe: 'Cozy Romance',
    genre: 'Romance',
    year: '2022',
    rating: 4.5
  },
  { 
    id: 3, 
    title: 'Quantum Chaos', 
    image: '/images/mindbend1.jpg', 
    vibe: 'Mind-Bending Thriller',
    genre: 'Thriller',
    year: '2024',
    rating: 4.9
  },
  { 
    id: 4, 
    title: 'Cyber Groove', 
    image: '/images/cyber1.jpg', 
    vibe: 'Futuristic Vibes',
    genre: 'Cyberpunk',
    year: '2023',
    rating: 4.7
  },
  { 
    id: 5, 
    title: 'Retro Popcorn', 
    image: '/images/retro1.jpg', 
    vibe: '80s Fun',
    genre: 'Comedy',
    year: '2021',
    rating: 4.3
  },
  { 
    id: 6, 
    title: 'Neon Dreams', 
    image: '/images/neon1.jpg', 
    vibe: 'Atmospheric Horror',
    genre: 'Horror',
    year: '2024',
    rating: 4.6
  },
  { 
    id: 7, 
    title: 'Sunset Drive', 
    image: '/images/sunset1.jpg', 
    vibe: 'Road Adventure',
    genre: 'Adventure',
    year: '2022',
    rating: 4.4
  },
];

export const MovieTinder = ({ onNext, onBack, setMovieTinderChoice }) => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [animation, setAnimation] = useState('');
  const [choice, setChoice] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const cardRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Shuffle and select a subset of cards
  useEffect(() => {
    const shuffled = [...movieTinderCards].sort(() => 0.5 - Math.random());
    // Select 5 random cards for this session
    setCards(shuffled.slice(0, 5));
  }, []);

  useEffect(() => {
    // Reset choice when new card is shown
    setChoice(null);
    setShowInfo(false);
  }, [currentIndex]);

  // Track image loading
  const handleImageLoaded = (id) => {
    setLoadedImages(prev => ({...prev, [id]: true}));
  };

  const handleChoice = (liked) => {
    if (choice !== null) return; // Prevent multiple choices
    
    setChoice(liked);
    
    // Set animation based on choice
    setAnimation(liked ? 'swipe-right' : 'swipe-left');
    
    // Update parent component with the choice
    setMovieTinderChoice({ 
      ...cards[currentIndex], 
      liked: liked
    });
    
    // Delay to allow animation to complete
    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setAnimation('');
      } else {
        onNext();
      }
    }, 500);
  };

  // Handle touch events for mobile swiping
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    
    if (cardRef.current && choice === null) {
      const deltaX = touchEndX.current - touchStartX.current;
      const rotation = deltaX / 20; // Subtle rotation effect
      
      cardRef.current.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
      
      // Change opacity of like/dislike buttons based on swipe direction
      if (deltaX > 50) {
        document.getElementById('like-button').style.opacity = '1';
        document.getElementById('dislike-button').style.opacity = '0.5';
      } else if (deltaX < -50) {
        document.getElementById('like-button').style.opacity = '0.5';
        document.getElementById('dislike-button').style.opacity = '1';
      } else {
        document.getElementById('like-button').style.opacity = '0.7';
        document.getElementById('dislike-button').style.opacity = '0.7';
      }
    }
  };

  const handleTouchEnd = () => {
    if (choice !== null) return;
    
    const deltaX = touchEndX.current - touchStartX.current;
    
    if (deltaX > 100) {
      // Swiped right (like)
      handleChoice(true);
    } else if (deltaX < -100) {
      // Swiped left (dislike)
      handleChoice(false);
    } else {
      // Reset position if not a definitive swipe
      if (cardRef.current) {
        cardRef.current.style.transform = 'translateX(0) rotate(0deg)';
      }
      
      document.getElementById('like-button').style.opacity = '0.7';
      document.getElementById('dislike-button').style.opacity = '0.7';
    }
  };

  // Handle navigation through cards
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onNext();
    }
  };

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-t-[#00AAFF] border-r-[#B14EFF] border-b-[#00F5D4] border-l-[#FF2A6D] rounded-full animate-spin"></div>
        <p className="mt-4 text-[#A3A8B8] animate-pulse">Finding movie vibes for you...</p>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const isImageLoaded = loadedImages[currentCard?.id];

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto animate-fade-in">
      <h2 className="text-3xl md:text-5xl font-heading text-center text-[#B14EFF] mb-6">
        How Do You Feel About This?
      </h2>

      <p className="text-[#A3A8B8] text-sm md:text-base text-center mb-8 max-w-md">
        Swipe right if you like this vibe, left if you don't. Your choices help our AI understand your taste.
      </p>

      {/* Card Progress Indicator */}
      <div className="flex gap-1 mb-6">
        {cards.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1 rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? 'w-10 bg-[#FF2A6D]' 
                : idx < currentIndex 
                  ? 'w-3 bg-[#00F5D4]' 
                  : 'w-3 bg-[#1A1E2E]'
            }`}
          ></div>
        ))}
      </div>

      {/* Main Card */}
      <div className="relative w-full h-96 md:h-[28rem] perspective-1000 mb-6">
        <div 
          ref={cardRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`relative w-full h-full rounded-2xl overflow-hidden shadow-lg shadow-blue-500/20 border border-[#00AAFF]/40 backdrop-blur-md bg-gray-900/70 transition-all duration-300 transform-gpu ${
            animation === 'swipe-right' 
              ? 'translate-x-full rotate-12 opacity-0' 
              : animation === 'swipe-left' 
                ? '-translate-x-full -rotate-12 opacity-0' 
                : ''
          }`}
        >
          {/* Image skeleton loader */}
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1E2E] to-[#050816] animate-pulse flex items-center justify-center">
              {/*<Film className="text-[#00AAFF]/30" size={48} />*/}
            </div>
          )}
          
          {/* Card image with gradient overlay */}
          <img
            src={currentCard?.image}
            alt={currentCard?.title}
            onLoad={() => handleImageLoaded(currentCard.id)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-80"></div>
          
          {/* Like/Dislike indicators that appear on swipe */}
          <div className={`absolute top-8 right-8 bg-[#00F5D4] rounded-lg px-4 py-2 font-bold text-[#050816] shadow-lg transform rotate-12 transition-opacity duration-300 ${choice === true ? 'opacity-100 scale-110' : 'opacity-0'}`}>
            LIKE
          </div>
          <div className={`absolute top-8 left-8 bg-[#FF2A6D] rounded-lg px-4 py-2 font-bold text-[#050816] shadow-lg transform -rotate-12 transition-opacity duration-300 ${choice === false ? 'opacity-100 scale-110' : 'opacity-0'}`}>
            PASS
          </div>

          {/* Card content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <div className="flex justify-between items-end mb-2">
              <h3 className="text-2xl md:text-3xl font-heading text-[#EEFFFF]">
                {currentCard?.title}
              </h3>
              <div className="flex items-center bg-[#1A1E2E]/80 px-2 py-1 rounded-lg backdrop-blur-sm">
                <Star className="text-[#FFDD00] mr-1" size={16} />
                <span className="text-sm text-[#EEFFFF]">{currentCard?.rating}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs bg-[#00AAFF]/30 text-[#00AAFF] px-3 py-1 rounded-full backdrop-blur-sm">
                {currentCard?.genre}
              </span>
              <span className="text-xs bg-[#B14EFF]/30 text-[#B14EFF] px-3 py-1 rounded-full backdrop-blur-sm">
                {currentCard?.year}
              </span>
            </div>

            <p className="text-[#A3A8B8] text-sm mb-4">
              {currentCard?.vibe}
            </p>

            {/* Info toggle button */}
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="flex items-center text-xs text-[#00F5D4] hover:text-[#00F5D4]/80 transition-colors"
            >
              <Info size={16} className="mr-1" />
              {showInfo ? 'Hide details' : 'More details'}
            </button>

            {/* Expandable info panel */}
            <div className={`overflow-hidden transition-all duration-300 mt-2 ${
              showInfo ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="bg-[#1A1E2E]/80 backdrop-blur-md rounded-lg p-3 border border-[#00AAFF]/20">
                <p className="text-xs text-[#EEFFFF]">
                  This card represents a movie with {currentCard?.vibe.toLowerCase()} aesthetics. 
                  Your reaction helps our AI understand if you prefer movies with this particular visual style and emotional tone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-6 mt-2">
        <button
          id="dislike-button"
          onClick={() => handleChoice(false)}
          disabled={choice !== null}
          className={`w-16 h-16 rounded-full bg-[#1A1E2E] border border-[#FF2A6D] text-[#FF2A6D] flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            choice === false ? 'bg-[#FF2A6D]/20 border-[#FF2A6D] scale-110' : ''
          }`}
        >
          <X size={24} />
        </button>

        {/* Navigation buttons (visible on desktop) */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-3 py-1 rounded-full border border-[#A3A8B8]/40 text-xs transition-colors ${
              currentIndex === 0 
                ? 'opacity-50 cursor-not-allowed text-[#A3A8B8]/40' 
                : 'text-[#A3A8B8] hover:text-[#EEFFFF] hover:border-[#EEFFFF]/40'
            }`}
          >
            <ArrowLeft size={14} />
          </button>
          <button
            onClick={handleNext}
            className="px-3 py-1 rounded-full border border-[#A3A8B8]/40 text-xs text-[#A3A8B8] hover:text-[#EEFFFF] hover:border-[#EEFFFF]/40 transition-colors"
          >
            <ArrowRight size={14} />
          </button>
        </div>

        <button
          id="like-button"
          onClick={() => handleChoice(true)}
          disabled={choice !== null}
          className={`w-16 h-16 rounded-full bg-[#1A1E2E] border border-[#00F5D4] text-[#00F5D4] flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            choice === true ? 'bg-[#00F5D4]/20 border-[#00F5D4] scale-110' : ''
          }`}
        >
          <Heart size={24} />
        </button>
      </div>
      
      {/* Mobile instructions */}
      <p className="text-[#A3A8B8] text-xs md:hidden mt-4 text-center">
        Swipe card left or right to interact, or use the buttons above
      </p>

      {/* Back/Skip buttons for mobile and desktop */}
      <div className="flex w-full justify-between mt-8 px-4">
        <button
          onClick={onBack}
          className="px-5 py-2 rounded-full bg-[#1A1E2E] border border-[#A3A8B8]/40 text-[#A3A8B8] hover:bg-[#A3A8B8]/10 transition-all duration-300 flex items-center text-sm"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back
        </button>
        
        <button
          onClick={onNext}
          className="px-5 py-2 rounded-full bg-[#1A1E2E] border border-[#00AAFF]/40 text-[#00AAFF] hover:bg-[#00AAFF]/10 transition-all duration-300 flex items-center text-sm"
        >
          Skip
          <ArrowRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};