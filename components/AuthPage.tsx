import React, { useState, useCallback } from 'react';
import { LogoIcon, MailIcon, LockIcon } from './Icons';

interface AuthPageProps {
  onLoginSuccess: () => void;
}

const AuthForm: React.FC<{ isLogin: boolean; onAuthSuccess: () => void; toggleForm: () => void; }> = ({ isLogin, onAuthSuccess, toggleForm }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onAuthSuccess();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">
        {isLogin ? 'Welcome Back!' : 'Create Account'}
      </h2>
      <p className="text-center text-slate-500 mb-8">
        {isLogin ? 'Login to check your products.' : 'Sign up to get started.'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-slate-600">Email</label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MailIcon className="w-5 h-5 text-slate-400" />
            </span>
            <input
              type="email"
              id="email"
              required
              placeholder="you@example.com"
              className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-pink-400 focus:border-pink-400 transition"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-medium text-slate-600">Password</label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockIcon className="w-5 h-5 text-slate-400" />
            </span>
            <input
              type="password"
              id="password"
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-pink-400 focus:border-pink-400 transition"
            />
          </div>
        </div>
        
        {!isLogin && (
           <div>
            <label htmlFor="confirm-password" className="text-sm font-medium text-slate-600">Confirm Password</label>
            <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockIcon className="w-5 h-5 text-slate-400" />
                </span>
                <input
                    type="password"
                    id="confirm-password"
                    required
                    minLength={6}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-pink-400 focus:border-pink-400 transition"
                />
            </div>
           </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 font-bold text-white bg-gradient-to-r from-pink-500 to-sky-500 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-offset-pink-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
        >
          {isSubmitting ? (isLogin ? 'Logging in...' : 'Creating Account...') : (isLogin ? 'Login' : 'Create Account')}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button onClick={toggleForm} className="font-semibold text-pink-500 hover:text-pink-600 ml-1">
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
};


export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = useCallback(() => {
    setIsLoginView(prev => !prev);
  }, []);

  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
            <LogoIcon className="h-16 w-16 text-pink-500 mx-auto" />
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mt-2">
              ProdCheck AI
            </h1>
        </div>
        <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-lg shadow-pink-200/30">
            <AuthForm 
                isLogin={isLoginView}
                onAuthSuccess={onLoginSuccess}
                toggleForm={toggleView}
            />
        </div>
      </div>
    </div>
  );
};