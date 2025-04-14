'use client';

import React, { useEffect, useState } from 'react';
import { Rocket, Film, Sparkles, Award, PlayCircle, Clock, Star, Info, ArrowLeft, Share2, Calendar, Globe } from 'lucide-react';

// Mock data for movie recommendations
const DUMMY_MOVIES = [
  {
    id: 1,
    title: 'Inception',
    year: 2010,
    poster: '/posters/inception.jpg',
    backdrop: '/backdrops/inception.jpg',
    rating: 8.8,
    runtime: 148,
    genres: ['Sci-Fi', 'Action', 'Thriller'],
    language: 'English',
    director: 'Christopher Nolan',
    matchScore: 97,
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    availableOn: ['Netflix', 'Amazon Prime'],
    keywords: ['dreams', 'mind-bending', 'heist', 'psychological'],
    similarTo: ['Mind-Bending']
  },
  {
    id: 2, 
    title: 'Interstellar',
    year: 2014,
    poster: '/posters/interstellar.jpg',
    backdrop: '/backdrops/interstellar.jpg',
    rating: 8.6,
    runtime: 169,
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    language: 'English',
    director: 'Christopher Nolan',
    matchScore: 94,
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    availableOn: ['HBO Max', 'Hulu'],
    keywords: ['space', 'time', 'exploration', 'emotional'],
    similarTo: ['Sci-Fi Adventure']
  },
  {
    id: 3,
    title: 'Your Name',
    year: 2016,
    poster: 'https://i.pinimg.com/originals/8a/07/6c/8a076c153112f6353f89239281c256b4.jpg',
    backdrop: '/backdrops/yourname.jpg',
    rating: 8.4,
    runtime: 106, 
    genres: ['Animation', 'Drama', 'Fantasy'],
    language: 'Japanese',
    director: 'Makoto Shinkai',
    matchScore: 91,
    description: "Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?",
    availableOn: ['Crunchyroll', 'Netflix'],
    keywords: ['romance', 'body-swap', 'supernatural', 'touching'],
    similarTo: ['Emotional Visuals']
  }
];

export const MovieOutput = ({ basicPreferences, thisOrThat, movieTinderChoice, onBack }) => {
  const [recommendation, setRecommendation] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Simulate API loading
    setIsLoading(true);
    
    const timeout = setTimeout(() => {
      // Simple algorithm using input to determine a theme
      let mood = 'Balanced Explorer';
      let themeColor = '#00AAFF';
      let vibe = 'A well-rounded movie night is in order!';
      let movies = [...DUMMY_MOVIES];

      // Randomize order slightly
      movies.sort(() => 0.5 - Math.random());

      if (movieTinderChoice?.liked && movieTinderChoice?.vibe?.includes('Thriller')) {
        mood = 'Mind Bender';
        themeColor = '#FF2A6D';
        vibe = 'You love intense, mind-twisting experiences that challenge perception.';
      } else if (thisOrThat?.choice === 'Visual Spectacle') {
        mood = 'Visual Voyager';
        themeColor = '#B14EFF';
        vibe = 'Aesthetics and visual storytelling captivate you — we found films with stunning imagery.';
      } else if (basicPreferences?.mood === 'chill') {
        mood = 'Cozy Dreamer';
        themeColor = '#00F5D4';
        vibe = 'Stories that evoke warm emotions and gentle reflection are your perfect match.';
      }

      setRecommendation({ mood, themeColor, vibe, movies });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [basicPreferences, thisOrThat, movieTinderChoice]);

  // Function to render movie streaming availability badges
  const renderAvailability = (platforms) => {
    const platformColors = {
      'Netflix': '#E50914',
      'Amazon Prime': '#00A8E1',
      'Disney+': '#113CCF',
      'HBO Max': '#5822B4',
      'Hulu': '#1CE783',
      'Apple TV+': '#000000',
      'Crunchyroll': '#F47521'
    };

    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {platforms.map(platform => (
          <span 
            key={platform}
            style={{ backgroundColor: `${platformColors[platform]}40` }}
            className="text-xs px-2 py-1 rounded-full border flex items-center"
           
          >
            {platform}
          </span>
        ))}
      </div>
    );
  };

  // Function to handle movie click for details
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowDetails(true);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-t-transparent rounded-full animate-spin border-[#00AAFF]"></div>
          <div className="absolute inset-2 border-4 border-t-transparent rounded-full animate-spin border-[#B14EFF] animate-reverse"></div>
          <Film className="absolute inset-0 m-auto text-[#00F5D4]" size={28} />
        </div>
        <p className="mt-6 text-xl text-[#EEFFFF] animate-pulse">Analyzing your preferences...</p>
        <p className="mt-2 text-sm text-[#A3A8B8]">Our AI is finding your perfect matches</p>
      </div>
    );
  }

  // Movie details view
  if (showDetails && selectedMovie) {
    return (
      <div className="animate-fade-in">
        <button 
          onClick={() => setShowDetails(false)}
          className="flex items-center text-[#00AAFF] hover:text-[#00F5D4] mb-6 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" /> Back to recommendations
        </button>
        
        <div className="relative rounded-3xl overflow-hidden">
          {/* Backdrop image with gradient overlay */}
          <div className="w-full h-52 md:h-80 relative">
            <div 
              className="absolute inset-0 bg-center bg-cover" 
              style={{ backgroundImage: `url(${selectedMovie.backdrop || '/api/placeholder/1200/600'})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/80 to-transparent"></div>
            
            {/* Movie title overlaid on backdrop */}
            <div className="absolute bottom-0 left-0 w-full p-6 flex items-end">
              <div className="w-1/3">
                <div className="aspect-[2/3] rounded-xl overflow-hidden border-2 border-[#00AAFF]/40 shadow-lg shadow-[#00AAFF]/20">
                  <img 
                    src={selectedMovie.poster || '/api/placeholder/300/450'} 
                    alt={selectedMovie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="w-2/3 pl-4">
                <h2 className="text-2xl md:text-4xl font-heading text-[#EEFFFF]">
                  {selectedMovie.title}
                </h2>
                <div className="flex items-center text-sm md:text-base text-[#A3A8B8] mt-1">
                  <span className="flex items-center mr-3">
                    <Calendar size={14} className="mr-1" /> {selectedMovie.year}
                  </span>
                  <span className="flex items-center mr-3">
                    <Clock size={14} className="mr-1" /> {Math.floor(selectedMovie.runtime / 60)}h {selectedMovie.runtime % 60}m
                  </span>
                  <span className="flex items-center">
                    <Star size={14} className="mr-1 text-yellow-400" /> {selectedMovie.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0C0C1E]/90 backdrop-blur-md p-6 rounded-b-3xl">
            {/* Details grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-[#00F5D4] mb-2">Synopsis</h3>
                <p className="text-[#EEFFFF]">{selectedMovie.description}</p>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-[#00F5D4] mb-2">Why We Recommend It</h3>
                  <div className="p-4 bg-[#1A1E2E] rounded-xl border border-[#B14EFF]/30">
                    <div className="flex items-start">
                      <Sparkles className="text-[#FF2A6D] mr-2 mt-1" size={18} />
                      <p className="text-[#EEFFFF]">
                        <span className="font-semibold text-[#FF2A6D]">{selectedMovie.matchScore}% Match</span> - This film aligns perfectly with your preference for {selectedMovie.similarTo.join(', ')}. 
                        The {selectedMovie.genres.join(' and ')} elements create an experience that matches your selected mood.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-[#00F5D4] mb-2">Available On</h3>
                  {renderAvailability(selectedMovie.availableOn)}
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#00F5D4] mb-2">Details</h3>
                  <div className="space-y-2 text-[#EEFFFF]">
                    <div className="flex justify-between">
                      <span className="text-[#A3A8B8]">Director</span>
                      <span>{selectedMovie.director}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A3A8B8]">Language</span>
                      <span className="flex items-center">
                        <Globe size={14} className="mr-1" /> {selectedMovie.language}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A3A8B8]">Rating</span>
                      <span className="flex items-center">
                        <Star size={14} className="mr-1 text-yellow-400" /> {selectedMovie.rating}/10
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-[#00F5D4] mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMovie.genres.map(genre => (
                      <span key={genre} className="px-3 py-1 bg-[#3A0CA3]/40 rounded-full text-sm border border-[#B14EFF]/40">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-[#00F5D4] mb-2">Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMovie.keywords.map(keyword => (
                      <span key={keyword} className="px-2 py-1 bg-[#1A1E2E] rounded-full text-xs text-[#A3A8B8]">
                        #{keyword}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-[#00AAFF] to-[#B14EFF] text-white flex items-center justify-center font-semibold hover:scale-105 transition-transform">
                  <PlayCircle size={16} className="mr-2" /> Watch Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Recommendations list view
  if (!recommendation) return null;

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-heading mb-3" style={{ color: recommendation.themeColor }}>
          Your Movie Vibe: {recommendation.mood}
        </h2>
        <p className="text-[#EEFFFF] max-w-2xl mx-auto">
          {recommendation.vibe}
        </p>
      </div>

      {/* AI Insight Card */}
      <div className="w-full max-w-4xl mx-auto mb-12 rounded-2xl bg-[#0C0C1E]/80 backdrop-blur-md border border-[#00AAFF]/30 shadow-lg p-6">
        <div className="flex items-start">
          <div className="bg-gradient-to-br from-[#00AAFF] to-[#B14EFF] rounded-full p-3 mr-4">
            <Rocket className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#EEFFFF] mb-2">AI Insight</h3>
            <p className="text-[#A3A8B8]">
              Based on your selections, we've analyzed over 10,000 movies to find your perfect matches. 
              Your preferences indicate you enjoy {basicPreferences?.mood || 'balanced'} content with a focus on 
              {basicPreferences?.genre?.length > 0 ? ' ' + basicPreferences.genre.join(', ') : ' diverse genres'}.
            </p>
          </div>
        </div>
      </div>

      {/* Movie Recommendations */}
      <h3 className="text-2xl font-semibold text-[#00F5D4] mb-4 flex items-center">
        <Award className="mr-2" size={20} />
        Top Recommendations
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {recommendation.movies.map((movie, index) => (
          <div 
            key={movie.id}
            className="bg-[#1A1E2E]/90 backdrop-blur-md rounded-2xl overflow-hidden border border-[#00AAFF]/20 hover:border-[#00AAFF]/60 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00AAFF]/20 cursor-pointer group"
            onClick={() => handleMovieClick(movie)}
          >
            {/* Movie poster with match score */}
            <div className="relative">
              <div className="aspect-[2/3]">
                <img 
                  src='https://i.pinimg.com/originals/8a/07/6c/8a076c153112f6353f89239281c256b4.jpg' 
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] to-transparent opacity-70"></div>
              
              {/* Match score pill */}
              <div className="absolute top-3 left-3 bg-[#1A1E2E]/90 backdrop-blur-md rounded-full px-2 py-1 text-xs flex items-center border border-[#00AAFF]/40">
                <Sparkles size={12} className="mr-1 text-[#FF2A6D]" />
                <span className="text-[#FF2A6D] font-semibold">{movie.matchScore}% Match</span>
              </div>
              
              {/* Quick info button */}
              <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-[#1A1E2E]/80 border border-[#00AAFF]/40 text-[#00AAFF] opacity-0 group-hover:opacity-100 transition-opacity">
                <Info size={14} />
              </button>
              
              {/* Award badge for top pick */}
              {index === 0 && (
                <div className="absolute top-12 -right-8 bg-gradient-to-r from-[#FF2A6D] to-[#B14EFF] text-white text-xs py-1 px-8 rotate-45 font-semibold">
                  TOP PICK
                </div>
              )}
            </div>
            
            {/* Movie info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#EEFFFF] mb-1 group-hover:text-[#00F5D4] transition-colors line-clamp-1">
                {movie.title}
              </h3>
              
              <div className="flex items-center justify-between text-xs text-[#A3A8B8]">
                <span className="flex items-center">
                  <Calendar size={12} className="mr-1" />
                  {movie.year}
                </span>
                <span className="flex items-center">
                  <Star size={12} className="mr-1 text-yellow-400" />
                  {movie.rating}
                </span>
                <span className="flex items-center">
                  <Clock size={12} className="mr-1" />
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-1">
                {movie.genres.slice(0, 2).map(genre => (
                  <span key={genre} className="text-xs px-2 py-1 bg-[#3A0CA3]/40 rounded-full border border-[#B14EFF]/30">
                    {genre}
                  </span>
                ))}
                {movie.genres.length > 2 && (
                  <span className="text-xs px-2 py-1 bg-[#1A1E2E] rounded-full text-[#A3A8B8]">
                    +{movie.genres.length - 2}
                  </span>
                )}
              </div>
              
              {/* Available on section */}
              <div className="mt-3 pt-3 border-t border-[#00AAFF]/10">
                <div className="text-xs text-[#A3A8B8] mb-1">Available on:</div>
                {renderAvailability(movie.availableOn)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-8">
        <button 
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-[#1A1E2E] text-[#00AAFF] border border-[#00AAFF] hover:bg-[#00AAFF]/10 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2 inline" /> Try Different Preferences
        </button>
        
        <button className="px-6 py-3 rounded-xl bg-[#1A1E2E] text-[#00AAFF] border border-[#00AAFF] hover:bg-[#00AAFF]/10 transition-colors">
          <Share2 size={16} className="mr-2 inline" /> Share Recommendations
        </button>
      </div>
    </div>
  );
};