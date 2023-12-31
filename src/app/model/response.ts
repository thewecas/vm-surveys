export interface SurveyResponse {
  userEmail: string;
  surveyId: string;
  responses: QuestionResponse[];
  dateOfSubmission: Date;
}

export interface QuestionResponse {
  questionId: string;
  answer: string;
}
