import React from 'react';
import { ResultData } from '../types';
import { Loader } from './Loader';
import { CheckCircle2Icon, AlertTriangleIcon, XCircleIcon, LinkIcon, LightbulbIcon } from './Icons';

interface ResultsSectionProps {
  isLoading: boolean;
  results: ResultData | null;
  error: string | null;
}

const TrustIcon: React.FC<{ rating: 'high' | 'medium' | 'low' }> = ({ rating }) => {
  switch (rating) {
    case 'high':
      return <CheckCircle2Icon className="w-5 h-5 text-teal-500" />;
    case 'medium':
      return <AlertTriangleIcon className="w-5 h-5 text-amber-500" />;
    case 'low':
      return <XCircleIcon className="w-5 h-5 text-rose-500" />;
    default:
      return null;
  }
};

const ResultCard: React.FC<{ results: ResultData }> = ({ results }) => {
  const scoreColor = results.similarityScore > 85 ? 'text-teal-500' : results.similarityScore > 60 ? 'text-amber-500' : 'text-rose-500';

  return (
    <div className="w-full bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 space-y-6 animate-fade-in shadow-lg shadow-pink-200/30">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <LinkIcon className="w-5 h-5 text-sky-500" />
          <h3 className="text-lg font-semibold text-slate-900">Original Product Link</h3>
        </div>
        <a href={results.originalLink} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 break-all text-center md:text-right font-semibold">
          {results.originalLink}
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-sky-100/50 p-4 rounded-2xl flex flex-col items-center justify-center">
          <p className="text-sm text-sky-700 mb-2 font-medium">Similarity Score</p>
          <p className={`text-5xl font-bold ${scoreColor}`}>{results.similarityScore}%</p>
        </div>
        <div className="bg-sky-100/50 p-4 rounded-2xl">
          <h4 className="font-semibold text-slate-900 mb-3">Other Detected Links</h4>
          <ul className="space-y-3">
            {results.otherLinks.map((link, index) => (
              <li key={index} className="flex items-center gap-3">
                <TrustIcon rating={link.trustRating} />
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-sky-800 truncate">
                  {link.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-3 mb-2">
            <LightbulbIcon className="w-5 h-5 text-amber-400" />
            <h4 className="font-semibold text-slate-900">Why this link is original</h4>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">{results.explanation}</p>
      </div>
    </div>
  );
};

export const ResultsSection: React.FC<ResultsSectionProps> = ({ isLoading, results, error }) => {
  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-8 space-y-4">
        <Loader />
        <p className="text-slate-600 font-medium">AI is analyzing your product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-rose-100/70 border border-rose-300/50 text-rose-800 p-4 rounded-2xl text-center animate-fade-in">
        <p>{error}</p>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  return <ResultCard results={results} />;
};