import React from 'react';
import LoginInfoCard from '@/app/components/login/loginInfoCard';
import LoginCard from '@/app/components/login/loginCard';
import { EventCarousel } from '@/app/components/common/eventCarousel';

const Login: React.FC = () => {
  return (
    <>
      <div className="relative flex items-center justify-center pt-16 min-h-screen">
        {/* Background Image with Tint */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/CC_Rider_Bg.jpeg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-70"></div>{' '}
          {/* Dark Tint */}
          {/* <Navbar /> */}
        </div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row w-full items-center justify-center">
            <div className="w-full md:w-1/2 flex items-center justify-center px-14">
              <LoginInfoCard />
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center px-4">
              <LoginCard />
            </div>
          </div>

          <div className="mt-8 pb-10">
            <EventCarousel eventType="upcoming" showmore={true} />
          </div>
        </div>
        {/* <EventCarousel eventType="upcoming" /> */}
      </div>{' '}
      {/* Closing the wrapping div */}
    </>
  );
};

export default Login;
