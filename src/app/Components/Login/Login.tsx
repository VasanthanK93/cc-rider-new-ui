import React from 'react';
import LoginInfoCard from './LoginInfoCard';
import LoginCard from './LoginCard';
import Navbar from './Navbar';
import Footer from './Footer';

const App: React.FC = () => {
  return (
    <>
      <div className="relative h-screen flex items-center justify-center pt-16">
        {/* Background Image with Tint */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/CC_Rider_Bg.jpeg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-70"></div>{' '}
          {/* Dark Tint */}
          <Navbar />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row w-full h-full">
          {/* Left Side (Hero Section) */}
          <div className="w-full md:w-1/2 flex items-center justify-center px-14">
            <LoginInfoCard />
          </div>

          {/* Right Side (Login Card) */}
          <div className="w-full md:w-1/2 flex items-center justify-center px-4">
            <LoginCard />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
