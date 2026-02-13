export interface Job {
  id: string;
  youtubeUrl: string;
  title: string;
  videoTitle?: string;
  channelName?: string;
  thumbnailUrl?: string;
  status: 'processing' | 'completed' | 'error';
  progress: number;
  currentStep: string | null;
  completedSteps: string[];
  results: JobResult[];
  error?: string;
  createdAt: string;
}

export interface JobResult {
  id: string;
  type: string;
  data: any;
}

export interface JobContextType {
  jobs: Job[];
  activeJob: string | null;
  createJob: (youtubeUrl: string) => Job;
  updateJob: (id: string, updates: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  setActiveJob: (id: string | null) => void;
  loadJobsFromStorage: () => void;
}