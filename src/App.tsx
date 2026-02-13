import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { YoutubeIcon, ChevronRight, HistoryIcon } from 'lucide-react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { JobProvider, useJobContext } from './context/JobContext';
import './App.css';

const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { activeJob, setActiveJob } = useJobContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/' && activeJob) {
      setActiveJob(null);
    }
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <MainContent />
      </div>
      
      <button 
        onClick={() => setSidebarOpen(true)}
        className="fixed bottom-6 right-6 md:hidden bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg z-10"
      >
        <HistoryIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

function App() {
  return (
    <JobProvider>
        {/* Sidebar */}
        
        {/* Main Content */}
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </BrowserRouter>
    </JobProvider>
  );
}

export default App;