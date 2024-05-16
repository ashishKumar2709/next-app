import React from 'react';

const NavSkeleton: React.FC = () => {
  return (
    <nav className="flex justify-between w-full mb-6 pt-1 mr-2 p-2 animate-pulse">
      <div className="font-medium flex justify-center items-center gap-2">
        <div className="rounded-full bg-gray-300 w-12 h-12"></div>
        <div className="bg-gray-300 h-6 w-24 rounded-md"></div>
      </div>
      <div className="flex gap-2">
        <div className="bg-gray-300 h-10 w-24 rounded-md"></div>
        <div className="bg-gray-300 h-10 w-24 rounded-md"></div>
        <div className="rounded-full bg-gray-300 w-9 h-9"></div>
      </div>
    </nav>
  );
};

export default NavSkeleton;