import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job, JobContextType } from '../types';
import { create } from 'zustand';

// Create a store with Zustand
export const useJobContext = create<JobContextType>((set) => ({
  jobs: [],
  activeJob: null,
  
  createJob: (youtubeUrl) => {
    const newJob: Job = {
      id: crypto.randomUUID(),
      youtubeUrl,
      title: '',
      videoTitle: undefined,
      channelName: undefined,
      thumbnailUrl: undefined,
      status: 'processing',
      progress: 0,
      currentStep: null,
      completedSteps: [],
      results: [],
      createdAt: new Date().toISOString(),
    };
    
    set((state) => ({ 
      jobs: [newJob, ...state.jobs],
      activeJob: newJob.id
    }));
    
    // Save to local storage
    const updatedJobs = [newJob];
    localStorage.setItem('youtube_leads_jobs', JSON.stringify(updatedJobs));
    
    return newJob;
  },
  
  updateJob: (id, updates) => {
    set((state) => {
      const updatedJobs = state.jobs.map((job) => {
        if (job.id === id) {
          const updatedJob = { ...job, ...updates };
          return updatedJob;
        }
        return job;
      });
      
      // Save to local storage
      localStorage.setItem('youtube_leads_jobs', JSON.stringify(updatedJobs));
      
      return { jobs: updatedJobs };
    });
  },
  
  deleteJob: (id) => {
    set((state) => {
      const updatedJobs = state.jobs.filter(job => job.id !== id);
      
      // Save to local storage
      localStorage.setItem('youtube_leads_jobs', JSON.stringify(updatedJobs));
      
      // Clear active job if it was deleted
      const newActiveJob = state.activeJob === id ? null : state.activeJob;
      
      return { 
        jobs: updatedJobs,
        activeJob: newActiveJob
      };
    });
  },
  
  setActiveJob: (id) => {
    set({ activeJob: id });
  },
  
  loadJobsFromStorage: () => {
    const savedJobs = localStorage.getItem('youtube_leads_jobs');
    if (savedJobs) {
      set({ jobs: JSON.parse(savedJobs) });
    }
  }
}));

// Create a React Context wrapper for components that need it
const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const jobStore = useJobContext();
  
  useEffect(() => {
    jobStore.loadJobsFromStorage();
  }, []);
  
  return (
    <JobContext.Provider value={jobStore}>
      {children}
    </JobContext.Provider>
  );
};

// React hook for accessing the context within components
export const useJobContextReact = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobContext must be used within a JobProvider');
  }
  return context;
};