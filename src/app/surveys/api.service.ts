import { Injectable } from '@angular/core';
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
}
