import React, { useState } from 'react';
import { CheckCircle, ChevronDown, Loader2, Send } from 'lucide-react';
import StarRating from './StarRating';
import { RatingState, FeedbackData, AIAnalysisResult } from '../types';
import { analyzeFeedback } from '../services/geminiService';

const FeedbackForm: React.FC = () => {
  const [ratings, setRatings] = useState<RatingState>({
    clarity: 0,
    interfaceUsability: 0,
    editorUsability: 0,
    fairness: 0,
  });

  const [comment, setComment] = useState('');
  const [gender, setGender] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (key: keyof RatingState) => (value: number) => {
    setRatings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setAnalysis(null);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Call Gemini API if there is a comment
    if (comment.length > 5) {
      const result = await analyzeFeedback(comment);
      setAnalysis(result);
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted && !analysis) {
     // Simple success state if no AI analysis triggered
     return (
       <div className="bg-white rounded shadow-sm border border-gray-200 p-8 text-center">
         <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
         <h3 className="text-xl font-medium text-gray-900">Thank you!</h3>
         <p className="text-gray-500 mt-2">Your feedback has been recorded.</p>
         <button 
           onClick={() => setSubmitted(false)} 
           className="mt-6 text-brand-blue font-medium hover:underline"
         >
           Submit another response
         </button>
       </div>
     )
  }

  return (
    <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
      {/* Form Header */}
      <div className="p-8 border-b border-gray-100">
        <h2 className="text-center text-gray-700 font-semibold text-lg mb-8">
          Please rate your test experience
        </h2>

        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Rating Rows */}
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
            <span className="text-sm text-gray-600 font-medium">Clarity of questions</span>
            <StarRating rating={ratings.clarity} onChange={handleRatingChange('clarity')} />
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
            <span className="text-sm text-gray-600 font-medium">Usability of Test Interface</span>
            <StarRating rating={ratings.interfaceUsability} onChange={handleRatingChange('interfaceUsability')} />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
            <span className="text-sm text-gray-600 font-medium">Usability of Code Editor</span>
            <StarRating rating={ratings.editorUsability} onChange={handleRatingChange('editorUsability')} />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
            <span className="text-sm text-gray-600 font-medium">Fairness of skill assessment</span>
            <StarRating rating={ratings.fairness} onChange={handleRatingChange('fairness')} />
          </div>

          {/* Comment Box */}
          <div className="pt-4">
            <textarea
              className="w-full border border-gray-300 rounded p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none h-32 transition-all"
              placeholder="Additional Comments (Optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Survey Section */}
      <div className="p-8 bg-gray-50/30">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-gray-700 font-bold text-lg mb-3">
            Help us build a better assessment platform
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed mb-8">
            We are committed to creating an inclusive assessment process. In order to track the effectiveness of our assessments across a diverse set of candidates, we would like to understand how you identify yourself. Completing this survey is voluntary and will not impact the selection process in any way. Also, your information will not be shared with your interviewers. It will be used exclusively to assess our capabilities and enable companies to assess a diverse set of top talent.
          </p>

          <div className="space-y-6">
            {/* Question 1 */}
            <div>
              <p className="text-sm text-gray-800 font-semibold mb-3">1. What is your gender Identity?</p>
              <div className="flex flex-wrap gap-6">
                {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map((option) => (
                  <label key={option} className="flex items-center cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={gender === option}
                        onChange={(e) => setGender(e.target.value)}
                        className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 checked:border-blue-600 transition-all"
                      />
                      <span className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 opacity-0 transition-opacity peer-checked:opacity-100"></span>
                    </div>
                    <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Question 2 */}
            <div>
              <p className="text-sm text-gray-800 font-semibold mb-3">2. What is your age?</p>
              <div className="relative w-full max-w-xs">
                <select 
                  className="w-full appearance-none border border-gray-300 bg-white text-gray-600 text-sm rounded px-3 py-2 pr-8 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.target.value)}
                >
                  <option value="" disabled>Select an age range</option>
                  <option value="18-24">18 - 24</option>
                  <option value="25-34">25 - 34</option>
                  <option value="35-44">35 - 44</option>
                  <option value="45+">45+</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Submit Actions */}
      <div className="p-6 border-t border-gray-100 bg-white flex justify-end">
        <button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-medium shadow-sm transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Submitting...
            </>
          ) : (
            <>
              Submit Feedback
            </>
          )}
        </button>
      </div>

      {/* AI Analysis Result Section (Conditional) */}
      {submitted && analysis && (
        <div className="bg-indigo-50 border-t border-indigo-100 p-8">
            <div className="flex items-center mb-4">
               <div className="bg-indigo-600 text-white p-1.5 rounded mr-3">
                  <Send size={16} />
               </div>
               <h4 className="text-lg font-bold text-indigo-900">AI Feedback Analysis</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                  <h5 className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2">Sentiment</h5>
                  <p className={`text-lg font-semibold ${
                     analysis.sentiment === 'Positive' ? 'text-green-600' : 
                     analysis.sentiment === 'Negative' ? 'text-red-600' : 'text-gray-700'
                  }`}>
                     {analysis.sentiment}
                  </p>
               </div>

               <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100 md:col-span-2">
                  <h5 className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2">Summary</h5>
                  <p className="text-sm text-gray-700 leading-relaxed">{analysis.summary}</p>
               </div>

               <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100 md:col-span-3">
                  <h5 className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2">Suggested Improvements</h5>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                     {analysis.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
               </div>
            </div>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-6 text-sm text-indigo-600 hover:text-indigo-800 underline"
            >
               Back to form
            </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;