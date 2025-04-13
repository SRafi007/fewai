'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, BadgeCheck, Rocket, Film, Zap } from 'lucide-react';

export const ProgressBar = ({ currentStep, totalSteps }) => {
  const [animateProgress, setAnimateProgress] = useState(false);
  const progressPercent = Math.round((currentStep / totalSteps) * 100);
  
  // Animate the progress after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateProgress(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Re-trigger animation when step changes
  useEffect(() => {
    setAnimateProgress(false);
    const timer = setTimeout(() => {
      setAnimateProgress(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [currentStep]);

  // Define icons, titles and colors for each step
  const steps = [
    { 
      icon: <Film size={18} />, 
      title: "Basic Preferences", 
      color: "#00F5D4",
      description: "Tell us what you like" 
    },
    { 
      icon: <Sparkles size={18} />, 
      title: "Visual Vibes", 
      color: "#B14EFF",
      description: "Choose your aesthetic" 
    },
    { 
      icon: <Zap size={18} />, 
      title: "This or That", 
      color: "#FF2A6D",
      description: "Make quick choices" 
    },
    { 
      icon: <Rocket size={18} />, 
      title: "Movie Tinder", 
      color: "#00AAFF",
      description: "Rate sample films" 
    },
    { 
      icon: <BadgeCheck size={18} />, 
      title: "AI Picks", 
      color: "#EEFFFF",
      description: "Get recommendations" 
    }
  ];

  return (
    <div className="w-full px-2 md:px-4 mt-6">
      {/* Main progress bar */}
      <div className="relative w-full h-3 bg-[#1A1A2E] rounded-full overflow-hidden border border-[#00AAFF]/20 shadow-inner">
        <div
          className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-out ${animateProgress ? '' : 'w-0'}`}
          style={{ 
            width: `${progressPercent}%`,
            background: `linear-gradient(90deg, #00AAFF, #B14EFF ${progressPercent}%, #00F5D4)`
          }}
        >
          {/* Animated glow effect */}
          <div className="absolute top-0 right-0 w-8 h-full bg-white opacity-30 blur-md animate-pulse"></div>
        </div>
      </div>
      
      {/* Step indicators for larger screens */}
      <div className="hidden md:flex justify-between mt-6 px-4">
        {steps.map((step, index) => (
          <div 
            key={index}
            className={`relative flex flex-col items-center transition-all duration-300 ${
              index + 1 === currentStep
                ? 'scale-110'
                : index + 1 < currentStep
                  ? 'opacity-70'
                  : 'opacity-40'
            }`}
          >
            {/* Step circle */}
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                index + 1 === currentStep
                  ? 'bg-gradient-to-r from-[#00AAFF] to-[#B14EFF] shadow-lg shadow-purple-500/20'
                  : index + 1 < currentStep
                    ? 'bg-[#1A1E2E] border border-[#00AAFF]'
                    : 'bg-[#1A1E2E] border border-[#1A1E2E]'
              }`}
              style={{
                color: index + 1 <= currentStep ? step.color : '#A3A8B8'
              }}
            >
              {index + 1 < currentStep ? (
                <BadgeCheck size={16} className="text-[#00F5D4]" />
              ) : (
                step.icon
              )}
            </div>
            
            {/* Connecting line */}
            {index < totalSteps - 1 && (
              <div className="absolute top-4 left-[calc(50%+12px)] w-[calc(100vw/var(--total-steps)-30px)] h-0.5 bg-[#1A1E2E] -z-10"
                style={{ '--total-steps': totalSteps }}
              ></div>
            )}
            
            {/* Step title */}
            <div className="mt-2 text-xs font-medium flex flex-col items-center" 
              style={{ color: index + 1 === currentStep ? step.color : '#A3A8B8' }}
            >
              <span>{step.title}</span>
              <span className={`text-[10px] transition-opacity duration-300 ${
                index + 1 === currentStep ? 'opacity-80' : 'opacity-0'
              }`}>
                {step.description}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile view - just show current step text */}
      <div className="md:hidden flex justify-between items-center mt-3 px-2">
        <div className="flex items-center">
          {steps[currentStep - 1]?.icon && (
            <span className="mr-2" style={{ color: steps[currentStep - 1]?.color }}>
              {steps[currentStep - 1]?.icon}
            </span>
          )}
          <span className="text-sm font-medium" style={{ color: steps[currentStep - 1]?.color }}>
            {steps[currentStep - 1]?.title}
          </span>
        </div>
        <div className="py-1 px-3 rounded-full bg-[#1A1E2E]/80 border border-[#00AAFF]/20 text-xs text-[#B0C4DE]">
          {currentStep}/{totalSteps}
        </div>
      </div>
      
      {/* Pulsing indicator for active step on mobile */}
      <div className="md:hidden flex justify-center mt-1">
        <span className="text-[10px] text-[#A3A8B8] animate-pulse">
          {steps[currentStep - 1]?.description}
        </span>
      </div>
    </div>
  );
};