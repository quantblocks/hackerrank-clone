import React from 'react';
import { User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-brand-navy h-14 flex items-center justify-between px-4 shadow-md z-10 relative">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-white rounded flex items-center justify-center mr-4 cursor-pointer">
          <span className="text-brand-navy font-bold text-xl leading-none pb-1">h</span>
        </div>
      </div>
      <div className="flex items-center">
        <button className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white hover:bg-gray-500 transition-colors">
            <span className="text-xs font-medium">H</span>
        </button>
      </div>
    </header>
  );
};

export default Header;