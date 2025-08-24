import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl mb-4 mx-auto animate-pulse">
          📚
        </div>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white font-medium">กำลังโหลด...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
