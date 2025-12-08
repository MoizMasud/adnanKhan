import React, { useState, useEffect } from 'react';
import { X, Phone, Instagram, Mail } from 'lucide-react';
import { baseUrl } from '../lib/base-url';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check if we're on the home page
    const path = window.location.pathname;
    const normalizedPath = path.replace(baseUrl, '').replace(/\/$/, '');
    const isHome = normalizedPath === '' || normalizedPath === '/';
    setIsHomePage(isHome);
    
    // Set initial scroll state
    setIsScrolled(window.scrollY > 50);
    
    // Mark as initialized after checking
    setIsInitialized(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: `${baseUrl}/` },
    { name: 'About', href: `${baseUrl}/about` },
    { name: 'Search Homes', href: `${baseUrl}/search` },
    { name: 'Featured Listings', href: `${baseUrl}/listings` },
    { name: 'Buying a Home', href: `${baseUrl}/buyers` },
    { name: 'Selling Your Home', href: `${baseUrl}/sellers` },
    { name: 'News', href: `${baseUrl}/news` },
    { name: 'Contact', href: `${baseUrl}/contact` }
  ];

  // Don't render until we know which page we're on
  if (!isInitialized) {
    return null;
  }

  // On non-home pages, always show solid background
  const shouldBeTransparent = isHomePage && !isScrolled;
  const textColor = shouldBeTransparent ? 'text-white' : 'text-[#0a131e]';
  const bgColor = shouldBeTransparent ? 'bg-transparent' : 'bg-white';
  const iconHoverBg = shouldBeTransparent ? 'hover:bg-white/10' : 'hover:bg-gray-100';
  
  // Burger menu line color - white when transparent, dark when scrolled
  const burgerLineColor = shouldBeTransparent ? 'bg-white' : 'bg-[#0a131e]';
  const burgerLineHoverColor = shouldBeTransparent ? 'bg-[#b7b7b7]' : 'bg-[#6c757d]';

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgColor} ${
          shouldBeTransparent ? 'py-6' : 'shadow-lg py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Left - Logo */}
          <a 
            href={`${baseUrl}/`}
            className={`font-heading text-xl sm:text-2xl font-light tracking-wider transition-colors ${textColor}`}
          >
            ADNAN KHAN
          </a>

          {/* Right - Contact Icons + Burger Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Phone Icon - First */}
            <a
              href="tel:+15191234567"
              className={`p-1.5 sm:p-2 rounded-full transition-all ${textColor} ${iconHoverBg}`}
              title="Call"
            >
              <Phone size={18} className="sm:w-5 sm:h-5" />
            </a>

            {/* Email Icon - Second (closed envelope) */}
            <a
              href="mailto:adnan@adnankhanrealty.com"
              className={`p-1.5 sm:p-2 rounded-full transition-all ${textColor} ${iconHoverBg}`}
              title="Email"
            >
              <Mail size={18} className="sm:w-5 sm:h-5" />
            </a>

            {/* Custom Animated Burger Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`p-2 sm:p-2.5 rounded-full transition-all ${iconHoverBg}`}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 sm:w-7 sm:h-6 flex flex-col justify-between">
                {/* Top line */}
                <span 
                  className={`block h-0.5 w-full rounded-full transition-all duration-300 ${
                    isHovered ? burgerLineHoverColor : burgerLineColor
                  }`}
                />
                {/* Middle line - starts at 50% width on right, expands to left on hover */}
                <span 
                  className={`block h-0.5 rounded-full transition-all duration-300 ml-auto ${
                    isHovered ? `${burgerLineHoverColor} w-full` : `${burgerLineColor} w-1/2`
                  }`}
                />
                {/* Bottom line */}
                <span 
                  className={`block h-0.5 w-full rounded-full transition-all duration-300 ${
                    isHovered ? burgerLineHoverColor : burgerLineColor
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-in Menu from Right */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-[#0a131e] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header - No border */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-8 sm:py-10">
            <h2 className="font-heading text-xl sm:text-2xl font-light tracking-[0.2em] text-white whitespace-nowrap">
              ADNAN KHAN
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white flex-shrink-0 ml-4"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links - No underlines, generous spacing */}
          <div className="flex-1 overflow-y-auto py-4 sm:py-6">
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-body text-[13px] sm:text-sm tracking-[0.15em] uppercase px-6 sm:px-8 py-4 sm:py-5 text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300 block"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info Footer - Reduced padding, better layout */}
          <div className="px-4 sm:px-6 py-6 sm:py-8 bg-black/20">
            <div className="space-y-4">
              {/* Phone */}
              <a
                href="tel:+15191234567"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
              >
                <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors flex-shrink-0">
                  <Phone size={16} className="text-white" />
                </div>
                <span className="font-body text-xs sm:text-sm whitespace-nowrap">(519) 123-4567</span>
              </a>

              {/* Email and Follow Us on the same row */}
              <div className="flex items-center justify-between gap-4">
                {/* Email on left */}
                <a
                  href="mailto:adnan@adnankhanrealty.com"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group flex-1 min-w-0"
                >
                  <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors flex-shrink-0">
                    <Mail size={16} className="text-white" />
                  </div>
                  <span className="font-body text-xs sm:text-sm truncate">adnan@adnankhanrealty.com</span>
                </a>

                {/* Follow Us on right */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group flex-shrink-0"
                >
                  <span className="font-body text-[10px] sm:text-xs uppercase tracking-[0.1em] whitespace-nowrap">Follow Us:</span>
                  <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                    <Instagram size={16} className="text-white" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
