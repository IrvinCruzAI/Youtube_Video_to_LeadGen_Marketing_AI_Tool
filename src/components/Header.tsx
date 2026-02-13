import React from 'react';
import { YoutubeIcon, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
      <div className="h-16 px-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <button 
            onClick={onMenuClick} 
            className="mr-4 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center">
            <YoutubeIcon className="h-7 w-7 text-red-600 mr-2" />
            <h1 className="text-xl font-bold">
              YouTube to <span className="text-red-600">Leads AI</span>
            </h1>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Powered by
          </div>
          <a 
            href="https://www.futurecrafters.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            🚀 FutureCrafters.ai
          </a>
        </div>
      </div>
      <div id="progress-indicator"></div>
    </header>
  );
};

export default Header;