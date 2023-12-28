export interface SurveyQuestion {
  id: string;
  question: string;
  description?: string;
  answerType: string;
  options?: string[];
}
