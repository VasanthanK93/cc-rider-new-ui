import Link from 'next/link';
import cyclist_icon from '../../assets/cyclist_166346.png';
import { useState } from 'react';
import { useUserStore } from '../../store';

const Navbar = () => {
  const handleLogout = () => {
    // Add your logout logic here
    console.log('User logged out');
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useUserStore((state: { user: any }) => state.user);

  return (
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
            href="/dashboard"
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
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
              <div className="px-4 py-2 text-gray-800 font-semibold border-b border-gray-200">
                {user ? user.displayName : 'Guest'}
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
  );
};

export default Navbar;
