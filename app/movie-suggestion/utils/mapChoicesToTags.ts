// Type definitions
type GenreWeight = {
  id: string;
  weight: number; // 1 (low) to 5 (high)
};

type MoodMapping = {
  id: string;
  tags: string[];
  relatedGenres?: string[];
};

type VisualMapping = {
  id: string;
  aestheticTags: string[];
  eraTag?: string;
};

type ThisOrThatMapping = {
  id: number;
  choice: string;
  tags: string[];
};

type TinderChoice = {
  id: number;
  title: string;
  vibe: string;
  liked: boolean;
};

type PreferenceWeights = {
  genre: number;
  mood: number;
  language: number;
  visual: number;
  thisOrThat: number;
  tinder: number;
};

export type Preferences = {
  genre?: string[];
  genres?: string[]; // Support both naming conventions
  mood?: string;
  moods?: string[]; // Support both naming conventions
  language?: string;
  visualChoice?: {
    id: string;
    label: string;
  } | string;
  thisOrThat?: { 
    id: number; 
    choice: string;
  };
  tinderChoices?: TinderChoice | TinderChoice[];
  movieTinderChoice?: TinderChoice; // Support alternative naming
};

// Mapping configurations
const MOOD_MAPPINGS: Record<string, MoodMapping> = {
  excited: {
    id: 'excited',
    tags: ['high-energy', 'fast-paced', 'thrilling'],
    relatedGenres: ['action', 'adventure', 'thriller']
  },
  sad: {
    id: 'sad',
    tags: ['emotional', 'dramatic', 'melancholic'],
    relatedGenres: ['drama', 'romance']
  },
  inspired: {
    id: 'inspired',
    tags: ['uplifting', 'motivational', 'thought-provoking'],
    relatedGenres: ['documentary', 'biography', 'drama']
  },
  chill: {
    id: 'chill',
    tags: ['relaxed', 'slow-paced', 'cozy'],
    relatedGenres: ['comedy', 'romance', 'animation']
  },
  adventurous: {
    id: 'adventurous',
    tags: ['epic', 'discovery', 'journey'],
    relatedGenres: ['adventure', 'fantasy', 'scifi']
  },
  melancholic: {
    id: 'melancholic',
    tags: ['emotional', 'dramatic', 'melancholic'],
    relatedGenres: ['drama', 'romance']
  },
  relaxed: {
    id: 'relaxed',
    tags: ['relaxed', 'slow-paced', 'cozy'],
    relatedGenres: ['comedy', 'romance', 'animation']
  }
};

const VISUAL_MAPPINGS: Record<string, VisualMapping> = {
  'epic-space': {
    id: 'epic-space',
    aestheticTags: ['space', 'cosmic', 'grand-scale'],
    eraTag: 'futuristic'
  },
  'romantic-dream': {
    id: 'romantic-dream',
    aestheticTags: ['dreamy', 'intimate', 'soft-focus'],
    eraTag: 'timeless'
  },
  'chill-vibes': {
    id: 'chill-vibes',
    aestheticTags: ['lofi', 'relaxed', 'casual'],
    eraTag: 'contemporary'
  },
  'retro-action': {
    id: 'retro-action',
    aestheticTags: ['nostalgic', 'adrenaline', 'classic'],
    eraTag: 'retro'
  },
  'neon-horror': {
    id: 'neon-horror',
    aestheticTags: ['dark', 'intense', 'stylized'],
    eraTag: 'modern'
  }
};

const THIS_OR_THAT_MAPPINGS: Record<string, string[]> = {
  'story-driven': ['plot-focused', 'character-development', 'narrative'],
  'visual-spectacle': ['visually-stunning', 'special-effects', 'cinematography'],
  'slow-burn': ['methodical', 'suspenseful', 'atmospheric'],
  'fast-paced': ['energetic', 'action-packed', 'quick-cuts'],
  'feel-good': ['uplifting', 'heartwarming', 'positive'],
  'mind-bending': ['complex', 'psychological', 'thought-provoking'],
  'old-school': ['classic', 'nostalgic', 'traditional'],
  'modern-vibes': ['contemporary', 'cutting-edge', 'fresh'],
  'realistic': ['grounded', 'authentic', 'true-to-life'],
  'fantasy': ['imaginative', 'magical', 'otherworldly']
};

const DEFAULT_WEIGHTS: PreferenceWeights = {
  genre: 5,    // Highest priority
  mood: 4,     // High priority
  language: 5, // Highest priority (language is a hard filter)
  visual: 3,   // Medium priority
  thisOrThat: 4, // High priority
  tinder: 3    // Medium priority
};

/**
 * Enhanced utility to map user choices to searchable tags with weighted importance
 * @param prefs - User preferences from the recommendation flow
 * @param weights - Optional custom weights for different preference types
 * @returns Object containing tags array and metadata about the mapping
 */
export const mapChoicesToTags = (
  prefs: Preferences,
  weights: Partial<PreferenceWeights> = {}
): {
  tags: string[];
  primaryGenres: string[];
  mood: string | null;
  languageFilter: string | null;
  eraPreference: string | null;
} => {
  // Apply default weights with any overrides
  const appliedWeights = { ...DEFAULT_WEIGHTS, ...weights };
  
  // Initialize collections
  const tags: string[] = [];
  const primaryGenres: string[] = [];
  let dominantMood: string | null = null;
  let languageFilter: string | null = null;
  let eraPreference: string | null = null;

  // Normalize inputs to handle both naming conventions
  const genres = prefs.genres || prefs.genre || [];
  const mood = prefs.mood || (prefs.moods?.[0] || null);
  
  // Process genres (with weight)
  if (genres.length > 0) {
    // Add weighted tags for genres
    genres.forEach((genre, index) => {
      const normalizedGenre = genre.toLowerCase().trim();
      // Primary genres get added to separate collection
      primaryGenres.push(normalizedGenre);
      
      // Add weighted genre tags
      // First genre has highest weight
      const weight = index === 0 ? appliedWeights.genre : Math.max(1, appliedWeights.genre - index);
      
      // Add the basic genre tag
      tags.push(normalizedGenre);
      
      // Add weighted version
      if (weight > 1) {
        tags.push(`genre:${normalizedGenre}:weight:${weight}`);
      }
    });
  }

  // Process mood
  if (mood) {
    const normalizedMood = mood.toLowerCase().trim();
    dominantMood = normalizedMood;
    
    // Look up mood in mappings
    const moodMapping = MOOD_MAPPINGS[normalizedMood];
    
    if (moodMapping) {
      // Add the basic mood
      tags.push(`mood:${normalizedMood}`);
      
      // Add associated tags
      moodMapping.tags.forEach(tag => {
        tags.push(tag);
        // Add weighted version
        tags.push(`mood-aspect:${tag}:weight:${appliedWeights.mood}`);
      });
      
      // Add related genres if not already selected
      if (moodMapping.relatedGenres) {
        moodMapping.relatedGenres.forEach(relatedGenre => {
          if (!primaryGenres.includes(relatedGenre)) {
            tags.push(`mood-related-genre:${relatedGenre}`);
          }
        });
      }
    } else {
      // Just add as a simple tag if no mapping
      tags.push(`mood:${normalizedMood}`);
    }
  }

  // Process language (always a hard filter)
  if (prefs.language) {
    const normalizedLanguage = prefs.language.toLowerCase().trim();
    languageFilter = normalizedLanguage;
    tags.push(`lang:${normalizedLanguage}`);
    tags.push(`language:${normalizedLanguage}:weight:${appliedWeights.language}`);
  }

  // Process visual choice
  if (prefs.visualChoice) {
    let visualId: string;
    
    // Handle both string and object formats
    if (typeof prefs.visualChoice === 'string') {
      visualId = prefs.visualChoice.toLowerCase().replace(/\s+/g, '-');
    } else {
      visualId = prefs.visualChoice.id.toLowerCase().replace(/\s+/g, '-');
    }
    
    // Look up visual mapping
    const visualMapping = VISUAL_MAPPINGS[visualId] || 
      Object.values(VISUAL_MAPPINGS).find(v => v.id === visualId);
    
    if (visualMapping) {
      // Store era preference
      if (visualMapping.eraTag) {
        eraPreference = visualMapping.eraTag;
        tags.push(`era:${visualMapping.eraTag}`);
      }
      
      // Add aesthetic tags
      visualMapping.aestheticTags.forEach(tag => {
        tags.push(`aesthetic:${tag}`);
        // Add weighted version
        tags.push(`visual:${tag}:weight:${appliedWeights.visual}`);
      });
    } else {
      // Just add as simple tag if no mapping
      tags.push(`visual:${visualId}`);
    }
  }

  // Process ThisOrThat choice
  if (prefs.thisOrThat?.choice) {
    const normalizedChoice = prefs.thisOrThat.choice.toLowerCase().replace(/\s+/g, '-');
    
    // Look up associated tags
    const choiceTags = THIS_OR_THAT_MAPPINGS[normalizedChoice];
    
    if (choiceTags) {
      choiceTags.forEach(tag => {
        tags.push(tag);
        // Add weighted version
        tags.push(`preference:${tag}:weight:${appliedWeights.thisOrThat}`);
      });
    }
    
    // Always add the base choice
    tags.push(`vibe:${normalizedChoice}`);
  }

  // Process Tinder choices
  const tinderChoices = prefs.tinderChoices || prefs.movieTinderChoice || [];
  const processedChoices = Array.isArray(tinderChoices) ? tinderChoices : [tinderChoices];
  
  processedChoices.filter(choice => choice && choice.liked).forEach(choice => {
    if (choice.vibe) {
      const normalizedVibe = choice.vibe.toLowerCase().replace(/\s+/g, '-');
      tags.push(`tinder-vibe:${normalizedVibe}`);
      tags.push(`like:${normalizedVibe}:weight:${appliedWeights.tinder}`);
    }
    
    if (choice.title) {
      const normalizedTitle = choice.title.toLowerCase().replace(/\s+/g, '-');
      tags.push(`tinder-title:${normalizedTitle}`);
    }
  });

  // Remove duplicates
  const uniqueTags = [...new Set(tags)];

  return {
    tags: uniqueTags,
    primaryGenres,
    mood: dominantMood,
    languageFilter,
    eraPreference
  };
};

/**
 * Generate a human-readable explanation of why movies were recommended
 * @param preferences User preferences
 * @returns String explanation
 */
export const generateRecommendationExplanation = (preferences: Preferences): string => {
  const parts: string[] = [];
  
  // Check for genres
  const genres = preferences.genres || preferences.genre || [];
  if (genres.length > 0) {
    if (genres.length === 1) {
      parts.push(`it's a ${genres[0]} film`);
    } else if (genres.length === 2) {
      parts.push(`it combines ${genres[0]} and ${genres[1]} elements`);
    } else {
      const lastGenre = genres[genres.length - 1];
      const otherGenres = genres.slice(0, -1).join(', ');
      parts.push(`it blends ${otherGenres}, and ${lastGenre} genres`);
    }
  }
  
  // Check for mood
  const mood = preferences.mood || (preferences.moods?.[0] || null);
  if (mood) {
    const moodMapping = MOOD_MAPPINGS[mood.toLowerCase()];
    if (moodMapping) {
      const moodTag = moodMapping.tags[0] || mood;
      parts.push(`matches your ${moodTag} mood`);
    }
  }
  
  // Check for visual preference
  if (preferences.visualChoice) {
    let visualId: string;
    if (typeof preferences.visualChoice === 'string') {
      visualId = preferences.visualChoice;
    } else {
      visualId = preferences.visualChoice.id;
    }
    
    const visualMapping = VISUAL_MAPPINGS[visualId];
    if (visualMapping && visualMapping.aestheticTags.length > 0) {
      parts.push(`has a ${visualMapping.aestheticTags[0]} visual style`);
    }
  }
  
  // Check for ThisOrThat preferences
  if (preferences.thisOrThat?.choice) {
    const normalizedChoice = preferences.thisOrThat.choice.toLowerCase();
    parts.push(`offers a ${normalizedChoice} experience`);
  }
  
  // Format the final explanation
  if (parts.length === 0) {
    return "matches your preferences";
  } else if (parts.length === 1) {
    return `because ${parts[0]}`;
  } else {
    const lastPart = parts.pop();
    return `because ${parts.join(', ')} and ${lastPart}`;
  }
};