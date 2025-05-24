import React from 'react';

const LoginInfoCard: React.FC = () => {
  return (
    <div className="text-white flex flex-col justify-center h-full p-6 md:p-12">
      <h1 className="text-3xl md:text-5xl font-bold">
        Explore the <span className="text-green-500">Beauty of Chennai</span> on
        two wheels with us!
      </h1>
      <p className="mt-4 text-lg">
        Do you like to ride cycle? Do you reside in and around Chennai? Would
        you like to meet and ride with like-minded people?
        <a
          href="https://chennaicyclists.com/signup"
          className="text-green-500 font-bold"
        >
          {' '}
          Join us.
        </a>
      </p>
    </div>
  );
};

export default LoginInfoCard;
