export interface SurveyQuestion {
  id: string;
  question: string;
  instrctions?: string;
  answerType: string;
  options?: string[];
}
