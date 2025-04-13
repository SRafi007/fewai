type Preferences = {
    genres: string[];
    moods: string[];
    language: string;
    visualChoice?: string;
    thisOrThat?: { id: number; choice: string };
    tinderChoices?: string[];
  };
  
  export const mapChoicesToTags = (prefs: Preferences): string[] => {
    const tags: string[] = [];
  
    // Add genres
    if (prefs.genres && prefs.genres.length > 0) {
      tags.push(...prefs.genres.map((g) => g.toLowerCase()));
    }
  
    // Add moods
    if (prefs.moods && prefs.moods.length > 0) {
      tags.push(...prefs.moods.map((m) => m.toLowerCase()));
    }
  
    // Add language
    if (prefs.language) {
      tags.push(`lang:${prefs.language.toLowerCase()}`);
    }
  
    // Add visual preference
    if (prefs.visualChoice) {
      tags.push(`visual:${prefs.visualChoice.toLowerCase()}`);
    }
  
    // Map ThisOrThat choice
    if (prefs.thisOrThat?.choice) {
      tags.push(`vibe:${prefs.thisOrThat.choice.toLowerCase().replace(/\s+/g, '-')}`);
    }
  
    // Tinder-style preferences
    if (prefs.tinderChoices && prefs.tinderChoices.length > 0) {
      tags.push(...prefs.tinderChoices.map((c) => `like:${c.toLowerCase()}`));
    }
  
    return tags;
  };
  