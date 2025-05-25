'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import cyclist_icon from '@/app/assets/cyclist_166346.png';
import { getAccessTokenFromCookie, useUserStore } from '@/app/store';
import { signOutUser } from '@/app/helpers/firebase/auth';
import { FaBars, FaTimes } from 'react-icons/fa';
import jwt from 'jsonwebtoken';
import React from 'react';

const Navbar = () => {
  const handleLogout = () => {
    // Add your logout logic here
    signOutUser();
  };
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [displayName, setDisplayName] = React.useState<string | null>(
    'Cyclist',
  );
  const accessToken = getAccessTokenFromCookie();
  const user = accessToken ? jwt.decode(accessToken) : null;
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    if (user && typeof user !== 'string' && 'name' in user) {
      setDisplayName(user.name);
    }
  }, [user]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  return (
    <>
      {accessToken ? (
        <header className="bg-white py-3 px-6 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/">
              <span className="flex items-center cursor-pointer">
                <img
                  src="https://images.ctfassets.net/ee85281gugj6/Pppr6SCCpFwpJ82J4fj0U/46e84d6cb03105a36705f480732c0ac8/CC_Logo_Short_Black.svg"
                  alt="Chennai Cyclists"
                  className="h-10"
                />
              </span>
            </Link>

            <nav className="hidden md:flex space-x-10">
              <Link
                href="/"
                className="text-gray-800 border-b-2 border-green-500 font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/events"
                className="text-gray-800 hover:text-green-500 transition"
              >
                Events
              </Link>
              <Link
                href="/stats"
                className="text-gray-800 hover:text-green-500 transition"
              >
                Stats
              </Link>
              <Link
                href="/calendar"
                className="text-gray-800 hover:text-green-500 transition"
              >
                Calendar
              </Link>
              <Link
                href="/about"
                className="text-gray-800 hover:text-green-500 transition"
              >
                About
              </Link>
              <Link
                href="/shop"
                className="text-gray-800 hover:text-green-500 transition"
              >
                Shop
              </Link>
              <Link
                href="/media"
                className="text-gray-800 hover:text-green-500 transition"
              >
                Media
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden text-gray-800">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div className="relative flex items-center">
              <img
                src={cyclist_icon.src}
                alt="Profile"
                className="h-8 w-8 rounded-full bg-green-500 cursor-pointer"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <div className="px-4 py-2 text-gray-800 font-semibold border-b border-gray-200">
                    {displayName}
                  </div>
                  <ul className="py-1">
                    <li>
                      <Link
                        href="/my-account"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        My Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/my-id-card"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        My ID Card
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/strava-account"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Strava Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/reset-password"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Reset Password
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>
      ) : (
        <div className="relative min-h-screen">
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
      )}
    </>
  );
};

export default Navbar;
