import React, { useState } from 'react';
import YouTubeInput from './YouTubeInput';
import ProcessSteps from './ProcessSteps';
import ResultsPanel from './ResultsPanel';
import { useJobContext } from '../context/JobContext';

const MainContent: React.FC = () => {
  const { activeJob, jobs } = useJobContext();
  const currentJob = activeJob ? jobs.find(job => job.id === activeJob) : null;
  
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        {!currentJob ? (
          <div>
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-4">
                Transform YouTube Videos into Marketing <span className="text-red-600">Leads with AI</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Generate lead magnets, landing pages, social content, and email sequences from any YouTube video in minutes.
              </p>
            </div>
            
            <YouTubeInput />
            
            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-4 text-center">How It Works</h2>
              
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <div className="text-red-600 font-bold text-lg mb-2">1. Paste URL</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Paste any YouTube URL with valuable content to extract knowledge
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <div className="text-red-600 font-bold text-lg mb-2">2. AI Analysis</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our AI analyzes the transcript and generates marketing assets
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <div className="text-red-600 font-bold text-lg mb-2">3. Get Results</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Download ready-to-use landing pages, lead magnets, emails & more
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="fade-in">
            {/* Video Details Header */}
            {currentJob.videoTitle && (
              <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                <div className="flex items-start space-x-4">
                  {currentJob.thumbnailUrl && (
                    <img 
                      src={currentJob.thumbnailUrl} 
                      alt="Video thumbnail"
                      className="w-32 h-24 object-cover rounded-md flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {currentJob.videoTitle}
                    </h1>
                    {currentJob.channelName && (
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        by {currentJob.channelName}
                      </p>
                    )}
                    <a 
                      href={currentJob.youtubeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      View on YouTube →
                    </a>
                  </div>
                </div>
              </div>
            )}
            
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Job Results
            </h2>
            
            <div className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-4">
                <ProcessSteps job={currentJob} />
              </div>
              
              <div className="md:col-span-8">
                <ResultsPanel job={currentJob} />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default MainContent;