import React from 'react';
import { CheckCircle } from 'lucide-react';
import Header from './components/Header';
import FeedbackForm from './components/FeedbackForm';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f4f5f7] flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        
        {/* Success Message Header */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <CheckCircle className="text-green-500 fill-green-100 rounded-full" size={28} />
            <h1 className="text-2xl text-gray-600 font-normal">
              Your test is submitted successfully
            </h1>
          </div>
        </div>

        {/* Main Card */}
        <FeedbackForm />

      </main>
      
      {/* Footer copyright matching style, although not explicitly in screenshot, good for completeness */}
      <footer className="py-6 text-center text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} Assessment Platform. All rights reserved.
      </footer>
    </div>
  );
};

export default App;