import React from 'react';
import { useJobContext } from '../context/JobContext';
import { ExternalLink, Trash2 } from 'lucide-react';
import { Job } from '../types';

interface JobItemProps {
  job: Job;
  onDelete: (id: string) => void;
}

const JobItem: React.FC<JobItemProps> = ({ job, onDelete }) => {
  const { setActiveJob } = useJobContext();
  
  const handleClick = () => {
    setActiveJob(job.id);
  };
  
  return (
    <div 
      onClick={handleClick}
      className="p-3 rounded-md bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition result-card relative"
    >
      <div className="flex items-start justify-between">
        <div className="truncate flex-1">
          <h3 className="font-medium truncate">
            {job.videoTitle || job.title || 'YouTube Video'}
          </h3>
          {job.channelName && (
            <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
              by {job.channelName}
            </p>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {new Date(job.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <a 
            href={job.youtubeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-red-600 hover:text-red-700"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(job.id);
            }}
            className="text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-2">
        <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
          <div 
            className="h-full bg-red-600 rounded-full"
            style={{ width: `${job.progress}%` }}  
          ></div>
        </div>
        <p className="text-xs text-right mt-1 text-gray-500 dark:text-gray-400">
          {job.completedSteps.length}/13 steps
        </p>
      </div>
    </div>
  );
};

export default JobItem;