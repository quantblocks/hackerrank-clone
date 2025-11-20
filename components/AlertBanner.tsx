import React from 'react';
import { Loader2 } from 'lucide-react';

const AlertBanner: React.FC = () => {
  return (
    <div className="bg-[#FFF7E6] border-b border-orange-200 px-4 py-3 flex items-center justify-center relative">
      <div className="flex items-center text-gray-700 text-sm">
        <Loader2 className="animate-spin text-orange-400 mr-2" size={16} />
        <span className="mr-2">Attempting to reconnect in 33 seconds</span>
      </div>
      
      <div className="absolute right-4 md:right-20 top-1/2 transform -translate-y-1/2">
         <button className="text-brand-blue text-sm font-medium hover:underline">
            Connect now
         </button>
      </div>
    </div>
  );
};

export default AlertBanner;