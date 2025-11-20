export interface RatingState {
  clarity: number;
  interfaceUsability: number;
  editorUsability: number;
  fairness: number;
}

export interface FeedbackData {
  ratings: RatingState;
  comment: string;
  gender: string;
  ageRange: string;
}

export interface AIAnalysisResult {
  sentiment: 'Positive' | 'Negative' | 'Neutral' | 'Mixed';
  summary: string;
  suggestions: string[];
}
