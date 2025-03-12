'use client';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    'Home',
    'Events',
    'Challenges',
    'Calender',
    'About',
    'Shop',
    'Media',
  ];

  return (
    <nav className="top-0 left-0 w-full bg-black/70 opacity-70 text-white px-4 py-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <img
          src="https://images.ctfassets.net/ee85281gugj6/4I7CWzaphrkSBiIpP0PuX4/eb4e62945e12de6978656f51ecb580e7/CC_Logo_Green_White.svg"
          alt="Logo"
          className="lg:w-24 lg:h-24 h-16 w-16 inline-block ml-12"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg">
          {menuItems.map((item) => {
            return (
              <li key={item}>
                <a href="#" key={item} className="hover:text-green-400">
                  {item}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu (Slide-in) */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 bg-black/90 text-white transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <ul className="flex flex-col items-center space-y-6 py-10">
          {menuItems.map((item) => {
            return (
              <li key={item}>
                <a href="#" key={item} className="hover:text-green-400">
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
