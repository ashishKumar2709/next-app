import React from "react";

const PostFormSkeleton: React.FC = () => {
  return (
    <div className="flex justify-center animate-pulse">
      <div className="m-4 border border-gray-400 w-3/4 p-4 bg-gray-200 rounded">
        <div className="space-y-4">
          <div className="h-6 bg-gray-400 rounded w-1/3"></div>
          <div className="h-4 bg-gray-400 rounded w-1/2"></div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col w-3/4 space-y-2">
            <div className="h-4 bg-gray-400 rounded w-1/3"></div>
            <div className="h-6 bg-gray-400 rounded"></div>
          </div>
          <div className="flex flex-col w-1/2 space-y-2">
            <div className="h-4 bg-gray-400 rounded w-1/3"></div>
            <div className="h-6 bg-gray-400 rounded"></div>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <div className="px-4 py-2 bg-gray-400 text-black rounded-md shadow-md h-8 w-16"></div>
            <div className="px-4 py-2 bg-gray-400 text-black rounded-md shadow-md h-8 w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFormSkeleton;
