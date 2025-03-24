
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="mb-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Financial Advisory Dashboard</h1>
        <p className="text-gray-500">
          Your personalized 360° financial advisory team, ready to guide you through every aspect of your financial journey.
        </p>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2" />
      </div>
    </header>
  );
};

export default Header;
