import { SurveyQuestion } from './survey-question';
export interface Survey {
  id: string;
  name: string;
  description: string;
  questions: SurveyQuestion[];
  createdOn: Date;
}
