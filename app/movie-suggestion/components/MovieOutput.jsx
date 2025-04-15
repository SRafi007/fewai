'use client';

import React, { useEffect, useState } from 'react';
import { Rocket, Film, Award, Calendar, Star, ArrowLeft, Share2 } from 'lucide-react';

// Mock data for movie recommendations
const DUMMY_MOVIES = [
  {
    id: 1,
    title: 'Inception',
    year: 2010,
    backdrop: '/backdrops/inception.jpg',
    rating: 8.8,
    genres: ['Sci-Fi', 'Action', 'Thriller'],
    language: 'English',
    director: 'Christopher Nolan',
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    availableOn: ['Netflix', 'Amazon Prime'],
    keywords: ['dreams', 'mind-bending', 'heist', 'psychological']
  },
  {
    id: 2, 
    title: 'Interstellar',
    year: 2014,
    backdrop: '/backdrops/interstellar.jpg',
    rating: 8.6,
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    language: 'English',
    director: 'Christopher Nolan',
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    availableOn: ['HBO Max', 'Hulu'],
    keywords: ['space', 'time', 'exploration', 'emotional']
  },
  {
    id: 3,
    title: 'Your Name',
    year: 2016,
    backdrop: '/backdrops/yourname.jpg',
    rating: 8.4,
    genres: ['Animation', 'Drama', 'Fantasy'],
    language: 'Japanese',
    director: 'Makoto Shinkai',
    description: "Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?",
    availableOn: ['Crunchyroll', 'Netflix'],
    keywords: ['romance', 'body-swap', 'supernatural', 'touching']
  }
];

// TMDB API configuration
const TMDB_API_KEY = '79e46bfb2d336971cab0ffc8042b5a3c'; // Replace with your actual API key
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const POSTER_SIZE = 'w342';

export const MovieOutput = ({ basicPreferences, thisOrThat, movieTinderChoice, onBack }) => {
  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [moviePosters, setMoviePosters] = useState({});

  // Function to fetch movie poster from TMDB by movie name
  const fetchMoviePoster = async (movieTitle, year) => {
    try {
      // Search for the movie by title and year
      const searchUrl = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movieTitle)}&year=${year}`;
      const response = await fetch(searchUrl);
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        // Get the poster path from the first result
        const posterPath = data.results[0].poster_path;
        if (posterPath) {
          return `${TMDB_IMAGE_BASE_URL}${POSTER_SIZE}${posterPath}`;
        }
      }
      // Return placeholder if no poster found
      return '/api/placeholder/300/450';
    } catch (error) {
      console.error(`Error fetching poster for ${movieTitle}:`, error);
      return '/api/placeholder/300/450';
    }
  };

  // Fetch posters for all movies in the recommendation
  useEffect(() => {
    const fetchAllPosters = async () => {
      if (recommendation && recommendation.movies) {
        const posterPromises = recommendation.movies.map(movie => 
          fetchMoviePoster(movie.title, movie.year).then(posterUrl => ({
            id: movie.id,
            posterUrl
          }))
        );
        
        const posters = await Promise.all(posterPromises);
        const postersMap = posters.reduce((acc, { id, posterUrl }) => {
          acc[id] = posterUrl;
          return acc;
        }, {});
        
        setMoviePosters(postersMap);
      }
    };
    
    if (recommendation) {
      fetchAllPosters();
    }
  }, [recommendation]);

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
      <div className="flex flex-wrap gap-1 mt-2">
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

  // Recommendations list view
  if (!recommendation) return null;

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-5xl font-heading mb-3" style={{ color: recommendation.themeColor }}>
          Your Movie Vibe: {recommendation.mood}
        </h2>
        <p className="text-[#EEFFFF] max-w-2xl mx-auto text-sm md:text-base">
          {recommendation.vibe}
        </p>
      </div>

      {/* AI Insight Card */}
      <div className="w-full max-w-4xl mx-auto mb-8 md:mb-12 rounded-2xl bg-[#0C0C1E]/80 backdrop-blur-md border border-[#00AAFF]/30 shadow-lg p-4 md:p-6">
        <div className="flex items-start">
          <div className="bg-gradient-to-br from-[#00AAFF] to-[#B14EFF] rounded-full p-2 md:p-3 mr-3 md:mr-4">
            <Rocket className="text-white" size={16} />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-[#EEFFFF] mb-1 md:mb-2">AI Insight</h3>
            <p className="text-xs md:text-sm text-[#A3A8B8]">
              Based on your selections, we've analyzed over 10,000 movies to find your perfect matches. 
              Your preferences indicate you enjoy {basicPreferences?.mood || 'balanced'} content with a focus on 
              {basicPreferences?.genre?.length > 0 ? ' ' + basicPreferences.genre.join(', ') : ' diverse genres'}.
            </p>
          </div>
        </div>
      </div>

      {/* Movie Recommendations */}
      <h3 className="text-xl md:text-2xl font-semibold text-[#00F5D4] mb-3 md:mb-4 flex items-center">
        <Award className="mr-2" size={18} />
        Top Recommendations
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-12">
        {recommendation.movies.map((movie, index) => (
          <div 
            key={movie.id}
            className="bg-[#1A1E2E]/90 backdrop-blur-md rounded-xl md:rounded-2xl overflow-hidden border border-[#00AAFF]/20 hover:border-[#00AAFF]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#00AAFF]/20 group"
          >
            {/* Movie poster */}
            <div className="relative">
              <div className="aspect-[2/3]">
                <img 
                  src={moviePosters[movie.id] || '/api/placeholder/300/450'} 
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] to-transparent opacity-70"></div>
              
              {/* Award badge for top pick */}
              {index === 0 && (
                <div className="absolute top-8 -right-6 bg-gradient-to-r from-[#FF2A6D] to-[#B14EFF] text-white text-[10px] py-0.5 px-6 rotate-45 font-semibold">
                  TOP PICK
                </div>
              )}
            </div>
            
            {/* Movie info */}
            <div className="p-3 md:p-4">
              <h3 className="text-base md:text-lg font-semibold text-[#EEFFFF] mb-1 line-clamp-1">
                {movie.title}
              </h3>
              
              <div className="flex items-center justify-between text-xs text-[#A3A8B8]">
                <span className="flex items-center">
                  <Calendar size={10} className="mr-1" />
                  {movie.year}
                </span>
                <span className="flex items-center">
                  <Star size={10} className="mr-1 text-yellow-400" />
                  {movie.rating}
                </span>
              </div>
              
              <div className="mt-2 flex flex-wrap gap-1">
                {movie.genres.slice(0, 2).map(genre => (
                  <span key={genre} className="text-xs px-2 py-0.5 bg-[#3A0CA3]/40 rounded-full border border-[#B14EFF]/30">
                    {genre}
                  </span>
                ))}
                {movie.genres.length > 2 && (
                  <span className="text-xs px-2 py-0.5 bg-[#1A1E2E] rounded-full text-[#A3A8B8]">
                    +{movie.genres.length - 2}
                  </span>
                )}
              </div>
              
              {/* Available on section */}
              <div className="mt-2 pt-2 border-t border-[#00AAFF]/10">
                <div className="text-xs text-[#A3A8B8] mb-1">Available on:</div>
                {renderAvailability(movie.availableOn)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 md:mt-8">
        <button 
          onClick={onBack}
          className="px-4 py-2 md:px-6 md:py-3 rounded-xl bg-[#1A1E2E] text-[#00AAFF] border border-[#00AAFF] hover:bg-[#00AAFF]/10 transition-colors text-sm md:text-base"
        >
          <ArrowLeft size={14} className="mr-2 inline" /> Try Different Preferences
        </button>
        
        <button className="px-4 py-2 md:px-6 md:py-3 rounded-xl bg-[#1A1E2E] text-[#00AAFF] border border-[#00AAFF] hover:bg-[#00AAFF]/10 transition-colors text-sm md:text-base">
          <Share2 size={14} className="mr-2 inline" /> Share Recommendations
        </button>
      </div>
    </div>
  );
};