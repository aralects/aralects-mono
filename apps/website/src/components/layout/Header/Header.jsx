import React, { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full relative m-auto flex justify-center">
      <header
        className={`fixed z-30 min-w-screen header mx-auto w-screen bg-white rounded-full shadow-md ${
          isMobileMenuOpen && "rounded-none"
        }`}
      >
        <div className="flex justify-between items-center px-5 py-3">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/images/logo.png" alt="logo" className="h-10" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <a href="#Home" className="text-gray-600 SpaceGrotesk hover:text-gray-900 font-medium">
              Home
            </a>
            <a href="#demo" className="text-gray-600 SpaceGrotesk hover:text-gray-900 font-medium">
              Demo
            </a>
            <a href="#blog" className="text-gray-600 SpaceGrotesk hover:text-gray-900 font-medium">
              Blog
            </a>
            <a href="#contact" className="text-gray-600 SpaceGrotesk hover:text-gray-900 font-medium">
              Contact Us
            </a>
            <a href="#careers" className="text-gray-600 SpaceGrotesk hover:text-gray-900 font-medium">
              Careers
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-600 hover:text-gray-900"
            aria-label="Toggle Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white shadow-lg">
            <ul className="flex flex-col space-y-4 px-5 py-3">
              <li>
                <a href="#Home" className="text-gray-600 SpaceGrotesk hover:text-gray-900 font-medium block">
                  Home
                </a>
              </li>
              <li>
                <a href="#demo" className="text-gray-600 SpaceGrotesk hover:text-gray-900 font-medium block">
                  Demo
                </a>
              </li>
              <li>
                <a href="#blog" className="text-gray-600 SpaceGrotesk hover:text-gray-900 font-medium block">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 SpaceGrotesk hover:text-gray-900 font-medium block">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#careers" className="text-gray-600 SpaceGrotesk hover:text-gray-900 font-medium block">
                  Careers
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </div>
  );
};

export default Header;
