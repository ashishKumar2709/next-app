import React from 'react';

const IdeaCardSkeleton: React.FC = () => {
  return (
    <div className="w-screen flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col p-4 border-0 border-solid border-gray-700 shadow-2xl rounded-md w-3/4 rounded bg-blue-50 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="rounded-md bg-gray-300 w-10 h-10"></div>
            <div className="flex flex-col m-0 gap-2">
              <div className="bg-gray-300 h-4 w-24 rounded-md"></div>
              <div className="bg-gray-300 h-4 w-40 rounded-md"></div>
            </div>
          </div>
          <div className="bg-gray-300 h-6 w-6 rounded-md"></div>
        </div>
        <div className="bg-gray-300 h-4 w-full my-4 rounded-md"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded-md"></div>
      </div>
    </div>
  );
};

export default IdeaCardSkeleton;