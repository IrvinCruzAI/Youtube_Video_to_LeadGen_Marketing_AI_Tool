import React, { useState } from 'react';
import { Youtube, ArrowRight, Loader2 } from 'lucide-react';
import { useJobContext } from '../context/JobContext';
import { processingSteps } from '../constants';
import { startProcessingJob } from '../api/processYouTube';

const YouTubeInput: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { createJob, setActiveJob } = useJobContext();
  
  const validateYouTubeUrl = (input: string) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return regex.test(input);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setUrl(inputValue);
    setIsValid(validateYouTubeUrl(inputValue));
    setError('');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid) {
      setError('Please enter a valid YouTube URL');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create a new job
      const newJob = createJob(url);
      
      // Set as active job
      setActiveJob(newJob.id);
      
      // Start processing
      await startProcessingJob(newJob.id, url);
      
    } catch (err) {
      console.error('Error processing YouTube URL:', err);
      setError('An error occurred while processing the YouTube URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="youtube-url" className="text-lg font-medium mb-2">
            Enter YouTube URL
          </label>
          
          <div className="relative youtube-input rounded-md overflow-hidden">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Youtube className="h-5 w-5 text-gray-400" />
            </div>
            
            <input
              id="youtube-url"
              type="text"
              value={url}
              onChange={handleInputChange}
              placeholder="https://www.youtube.com/watch?v=..."
              className="block w-full pl-10 pr-3 py-3 border-0 focus:ring-0 bg-white dark:bg-gray-700"
              disabled={isLoading}
            />
            
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={`absolute inset-y-0 right-0 px-4 py-3 bg-red-600 hover:bg-red-700 text-white flex items-center transition-all ${!isValid && 'opacity-60 cursor-not-allowed'}`}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Transform <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </button>
          </div>
          
          {error && (
            <p className="mt-2 text-red-600 text-sm">{error}</p>
          )}
          
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Paste any YouTube URL and we'll convert it into valuable marketing assets.
          </p>
        </div>
      </form>
      
      <div className="mt-8">
        <h3 className="text-md font-medium mb-3">
          What you'll get in the process:
        </h3>
        
        <div className="space-y-2">
          {processingSteps.map((step, index) => (
            <div 
              key={step.id} 
              className="flex items-center p-2 rounded-md border border-gray-200 dark:border-gray-700"
            >
              <div className="step-indicator step-pending">
                {index + 1}
              </div>
              <div>
                <div className="font-medium">{step.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{step.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YouTubeInput;