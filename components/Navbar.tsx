import React from 'react';
import { LogoIcon, LogOutIcon } from './Icons';

interface NavbarProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  return (
    <header className="sticky top-0 z-10 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-6 bg-white/60 backdrop-blur-xl border border-white/50 rounded-full shadow-lg shadow-pink-200/20">
          <div className="flex items-center gap-3">
            <LogoIcon className="h-9 w-9 text-pink-500" />
            <span className="text-xl font-bold tracking-tight text-slate-900">
              ProdCheck AI
            </span>
          </div>
          {isLoggedIn && (
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-white/50 hover:bg-pink-100/50 rounded-full transition-colors duration-300"
              aria-label="Logout"
            >
              <LogOutIcon className="w-4 h-4" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};