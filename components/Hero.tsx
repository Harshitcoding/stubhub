import React from 'react';

const Hero = () => {
  return (
    <div
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
     // Replace with your image
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-2xl px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Welcome to Our Blog
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Discover the latest articles, insights, and stories from around the world.
        </p>
        
      </div>
    </div>
  );
};

export default Hero;