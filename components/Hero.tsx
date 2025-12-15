import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-sky-500">
        ProdCheck AI
      </h1>
      <p className="mt-2 text-lg md:text-xl text-slate-600 font-medium">
        Verify Before You Buy.
      </p>
    </div>
  );
};