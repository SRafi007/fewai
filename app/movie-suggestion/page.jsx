'use client';

import React, { useState } from 'react';
import { BasicPreferences } from './components/BasicPreferences';
import { VisualChoice } from './components/VisualChoice';
import { ThisOrThat } from './components/ThisOrThat';
import { MovieTinder } from './components/MovieTinder';
import { MovieOutput } from './components/MovieOutput';
import { ProgressBar } from './components/ProgressBar';
import { Film, Zap, Command } from 'lucide-react';

export default function MovieSuggestionPage() {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({});
  const [visualChoice, setVisualChoice] = useState(null);
  const [thisOrThatChoice, setThisOrThatChoice] = useState(null);
  const [tinderChoices, setTinderChoices] = useState([]);
  const totalSteps = 5;

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => Math.max(1, prev - 1));

  const getStepTitle = () => {
    switch(step) {
      case 1: return "Basic Preferences";
      case 2: return "Visual Vibes";
      case 3: return "This or That";
      case 4: return "Quick Reactions";
      case 5: return "AI Recommendations";
      default: return "";
    }
  };

  const getStepIcon = () => {
    switch(step) {
      case 1: return <Command className="text-[#00F5D4] mr-2" />;
      case 2: return <Film className="text-[#B14EFF] mr-2" />;
      case 3: return <Zap className="text-[#FF2A6D] mr-2" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050816] to-[#0B1026] text-[#EEFFFF] font-body">
      <main className="px-4 py-16 md:px-12 md:py-16">
        <div className="max-w-4xl mx-auto">          
          <ProgressBar currentStep={step} totalSteps={totalSteps} />
          
          <div className="mt-8 md:mt-12">
            {step === 1 && (
              <BasicPreferences
                onNext={handleNext}
                setPreferences={setPreferences}
                initialPreferences={preferences}
              />
            )}

            {step === 2 && (
              <VisualChoice
                onNext={handleNext}
                onBack={handleBack}
                setVisual={setVisualChoice}
              />
            )}

            {step === 3 && (
              <ThisOrThat
                onNext={handleNext}
                onBack={handleBack}
                setThisOrThat={setThisOrThatChoice}
              />
            )}

            {step === 4 && (
              <MovieTinder
                onNext={handleNext}
                onBack={handleBack}
                setMovieTinderChoice={setTinderChoices}
              />
            )}

            {step === 5 && (
              <MovieOutput
                basicPreferences={preferences}
                thisOrThat={thisOrThatChoice}
                movieTinderChoice={tinderChoices}
                onBack={handleBack}
              />
            )}
          </div>
        </div>
      </main>
      
      {/* Footer with subtle animation */}
      <footer className="py-4 px-6 text-center text-[#A3A8B8] text-sm border-t border-[#00AAFF]/20 backdrop-blur-md bg-[#1A1E2E]/30 mt-10">
        <div className="max-w-4xl mx-auto">
          <p className="animate-pulse">
            <span className="bg-gradient-to-r from-[#00AAFF] to-[#B14EFF] text-transparent bg-clip-text font-semibold">AI-Powered</span> Movie Recommendation System
          </p>
        </div>
      </footer>
    </div>
  );
}