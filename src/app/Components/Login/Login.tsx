import React from 'react';
import LoginInfoCard from './LoginInfoCard';
import LoginCard from './LoginCard';
import Navbar from './Navbar';
import Footer from '../common/footer';
import { EventCarousel } from '../common/eventcarousel';

const Login: React.FC = () => {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/CC_Rider_Bg.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        <div className="flex flex-col md:flex-row w-full items-center justify-center">
          <div className="w-full md:w-1/2 flex items-center justify-center px-14">
            <LoginInfoCard />
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center px-4">
            <LoginCard />
          </div>
        </div>

        <div className="mt-8 pb-10">
          <EventCarousel eventType="upcoming" />
        </div>
      </div>
    </div>


  );
};

export default Login;
