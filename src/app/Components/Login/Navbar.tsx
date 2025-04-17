'use client';

import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { id: 1, text: 'Home' },
    { id: 2, text: 'Events' },
    { id: 3, text: 'Challenges' },
    { id: 4, text: 'Calender' },
    { id: 5, text: 'About' },
    { id: 6, text: 'Shop' },
    { id: 7, text: 'Media' },
  ];

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <nav className="w-full bg-transparent md:bg-opacity-0 md:relative z-40">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <img
            src="https://images.ctfassets.net/ee85281gugj6/4I7CWzaphrkSBiIpP0PuX4/eb4e62945e12de6978656f51ecb580e7/CC_Logo_Green_White.svg"
            alt="Logo"
            className="lg:w-24 lg:h-24 h-16 w-16 inline-block ml-12"
          />
          <ul className="hidden md:flex space-x-6 text-white text-lg">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href="#" className="hover:text-gray-200">
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(true)}
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="absolute top-0 left-0 w-full bg-black opacity-80 z-50 shadow-lg">
          <div className="flex justify-between items-center px-6 py-4">
            <img
              src="https://images.ctfassets.net/ee85281gugj6/4I7CWzaphrkSBiIpP0PuX4/eb4e62945e12de6978656f51ecb580e7/CC_Logo_Green_White.svg"
              alt="Logo"
              className="lg:w-24 lg:h-24 h-16 w-16 inline-block ml-12"
            />

            <button
              className="text-white text-3xl"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
          </div>

          <ul className="text-white text-lg text-center py-4 space-y-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href="#"
                  className="hover:text-gray-200 block"
                  onClick={() => setIsOpen(false)}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
