import { Injectable } from '@angular/core';
import { SurveyResponse } from '../model/response';
import { Survey } from '../model/survey';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  storeSurveyList(surveyList: Survey[]) {
    localStorage.setItem('surveys', JSON.stringify(surveyList));
  }

  getSurveyList() {
    const surveys = localStorage.getItem('surveys');
    return surveys ? JSON.parse(surveys) : [];
  }

  storeResponsesList(responseList: SurveyResponse[]) {
    localStorage.setItem('responses', JSON.stringify(responseList));
  }

  getResponseList() {
    const responses = localStorage.getItem('responses');
    return responses ? JSON.parse(responses) : [];
  }
}
