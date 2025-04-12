'use client'
import React, { useEffect, useState, useRef } from 'react';
import { ChevronRight, Zap } from 'lucide-react';

// Background floating images
const backgroundImages = [
  '/hero_img/img_bb.png',
  '/hero_img/img_got.png',
  '/hero_img/img_harry.png',
  '/hero_img/img_nezha.png',
  '/hero_img/img_srk.png',
  '/hero_img/img_walle.png',
];

export default function HeroSection() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [imageStyles, setImageStyles] = useState([]);
  const initialized = useRef(false);
  
  useEffect(() => {
    if (!initialized.current) {
      // Generate static values once on client-side
      const styles = backgroundImages.map((_, index) => ({
        width: `${Math.max(100, Math.min(200, 100 + Math.random() * 100))}px`,
        height: `${Math.max(100, Math.min(200, 100 + Math.random() * 100))}px`,
        left: `${(index % 3) * 33 + Math.random() * 20}%`,
        top: `${Math.floor(index / 3) * 40 + Math.random() * 20}%`,
        rotate: Math.random() * 20 - 10,
        zIndex: Math.floor(Math.random() * 3),
      }));
      
      setImageStyles(styles);
      initialized.current = true;
    }
    
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Trigger animation after 600ms
    const timeout = setTimeout(() => {
      setAnimationComplete(true);
    }, 600);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="relative overflow-hidden h-screen w-full bg-gradient-to-b from-[#050816] to-[#0B1026]">
      {/* Floating background image squares */}
      <div className="absolute inset-0 z-0">
        {imageStyles.length > 0 && backgroundImages.map((img, index) => (
          <div 
            key={index}
            className="absolute rounded-2xl overflow-hidden shadow-lg shadow-blue-500/10 opacity-40"
            style={{
              width: imageStyles[index].width,
              height: imageStyles[index].height,
              left: imageStyles[index].left,
              top: imageStyles[index].top,
              transform: `rotate(${imageStyles[index].rotate}deg) translate(${Math.sin(scrollPosition / 1000 + index) * 20}px, ${Math.cos(scrollPosition / 1000 + index) * 20}px)`,
              transition: 'transform 4s ease-out',
              zIndex: imageStyles[index].zIndex,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 mix-blend-overlay" />
            <img 
              src={img} 
              alt="AI feature" 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/80 via-transparent to-[#0B1026] z-10" />
      
      {/* Main content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center px-6 md:px-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated badge */}
          <div className={`inline-flex items-center gap-2 py-2 px-4 rounded-full bg-[#1A1E2E] border border-[#00F5D4]/30 shadow-md shadow-cyan-400/20 mb-6 transition-all duration-700 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <span className="h-2 w-2 rounded-full bg-[#00F5D4] animate-pulse" />
            <span className="text-cyan-300 font-heading text-sm md:text-base">AI-Powered Experience</span>
          </div>
          
          {/* Main heading with animated staggered lines */}
          <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-cyan-50 mb-6">
            <span className={`block mb-2 transition-all duration-700 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
              Discover The Future
            </span>
            <span className={`block relative transition-all duration-700 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
              <span className="relative">
                With <span className="inline-block relative">
                  <span className="relative z-20 bg-gradient-to-r from-[#00AAFF] to-[#B14EFF] text-transparent bg-clip-text">AI Technology</span>
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[#00AAFF] to-[#B14EFF] rounded-full blur-sm" />
                </span>
              </span>
            </span>
          </h1>
          
          {/* Description text */}
          <p className={`text-gray-400 font-body text-lg md:text-xl max-w-2xl mx-auto mb-8 transition-all duration-700 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`} style={{ transitionDelay: '600ms' }}>
            Experience personalized recommendations, intelligent insights, and futuristic interactions powered by advanced artificial intelligence.
          </p>
          
          {/* CTA Button with special effects */}
          <div className={`transition-all duration-700 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`} style={{ transitionDelay: '800ms' }}>
            <button className="group relative overflow-hidden font-heading font-medium text-lg px-8 py-4 rounded-full bg-gradient-to-r from-[#00AAFF] to-[#B14EFF] text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300">
              <span className="relative z-10 flex items-center gap-2">
                Get Your AI Buddy <span className="text-xs">It's Free</span>
                <Zap className="w-5 h-5 transition-all duration-300 group-hover:rotate-12" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#00F5D4] to-[#00AAFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
            </button>
          </div>
          
          {/* Scroll indicator */}
          <div className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${animationComplete ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '1200ms' }}>
            <div className="animate-bounce flex flex-col items-center">
              <span className="text-cyan-50 text-sm mb-2 font-heading">Explore More</span>
              <ChevronRight size={20} className="text-cyan-50 rotate-90" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}