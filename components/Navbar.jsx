
'use client'
import React, { useState, useEffect } from 'react';
import { Home, Search, Film, Brain, Menu, X } from 'lucide-react';

export default function FuturisticNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'discover', label: 'Discover', icon: Search },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'ai', label: 'AI Lab', icon: Brain },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`fixed w-full transition-all duration-500 z-50 flex justify-center ${scrolled ? 'top-2' : 'top-4'}`}>
        <div className="hidden md:block">
          <div className={`flex items-center gap-1 bg-gray-900 bg-opacity-95 backdrop-blur-md transition-all duration-500 rounded-full border border-opacity-30 ${
            activeItem === 'home' ? 'border-blue-400 shadow-[0_0_15px_0_rgba(0,170,255,0.4)]' : 
            activeItem === 'discover' ? 'border-purple-400 shadow-[0_0_15px_0_rgba(177,78,255,0.4)]' : 
            activeItem === 'movies' ? 'border-cyan-400 shadow-[0_0_15px_0_rgba(0,245,212,0.4)]' : 
            'border-indigo-400 shadow-[0_0_15px_0_rgba(58,12,163,0.4)]'
          }`}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`relative flex items-center justify-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${
                    activeItem === item.id 
                      ? 'text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span className={`${activeItem === item.id ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                    {item.label}
                  </span>
                  {activeItem === item.id && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-20" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Navbar - Top Island Style */}
        <div className="md:hidden flex justify-center w-full px-4">
          <div className={`flex items-center gap-1 bg-gray-900 bg-opacity-95 backdrop-blur-md transition-all duration-300 rounded-full border border-opacity-40 ${
            activeItem === 'home' ? 'border-blue-400 shadow-[0_0_12px_0_rgba(0,170,255,0.5)]' : 
            activeItem === 'discover' ? 'border-purple-400 shadow-[0_0_12px_0_rgba(177,78,255,0.5)]' : 
            activeItem === 'movies' ? 'border-cyan-400 shadow-[0_0_12px_0_rgba(0,245,212,0.5)]' : 
            'border-indigo-400 shadow-[0_0_12px_0_rgba(58,12,163,0.5)]'
          }`}>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 text-white"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="flex-grow flex justify-center">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                if (index > 1) return null; // Only show first two items on small screens
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveItem(item.id)}
                    className={`relative flex items-center justify-center px-4 py-2 transition-all duration-300 ${
                      activeItem === item.id ? 'text-white' : 'text-gray-400'
                    }`}
                  >
                    <Icon size={18} />
                  </button>
                );
              })}
            </div>
            
            {/* Always show AI Lab icon on right */}
            <button
              onClick={() => setActiveItem('ai')}
              className={`p-3 transition-all duration-300 ${
                activeItem === 'ai' ? 'text-white' : 'text-gray-400'
              }`}
            >
              <Brain size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Expanded Menu */}
      <div className={`md:hidden fixed inset-x-0 top-16 z-40 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="mx-auto w-4/5 bg-gray-900 bg-opacity-95 rounded-2xl border border-blue-500/30 shadow-[0_0_20px_0_rgba(0,170,255,0.3)] backdrop-blur-md">
          <div className="flex flex-col p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 my-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeItem === item.id 
                      ? 'bg-gradient-to-r from-blue-600/40 to-purple-600/40 text-white' 
                      : 'text-gray-300 hover:bg-gray-800/50'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}