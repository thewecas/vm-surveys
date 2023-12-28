import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Survey } from '../model/survey';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  surveyList: Survey[] = [];

  surveyList$ = new BehaviorSubject<Survey[]>(this.surveyList);
  constructor() {
    this.addDummyData();
  }

  postSurvey(newSurvey: Survey) {
    this.surveyList.push(newSurvey);
    console.log(this.surveyList);
  }

  getSurveyDetails(id: string): Survey | null {
    return this.surveyList.find((survey) => survey.id == id) ?? null;
  }

  getSurveyList() {
    return this.surveyList$.asObservable();
  }

  addDummyData() {
    this.surveyList.push({
      id: '8e74acd8-dde2-4149-9588-0553dbf6ff5a',
      name: 'Survey 1',
      description: 'Some random description',
      questions: [],
      createdOn: new Date('2023-12-28T09:57:41.755Z'),
    });

    this.surveyList.push({
      id: 'b7862c0d-ccbb-4786-b441-38c4f0b6d3a0',
      name: 'Survey 2',
      description:
        " Some Description that is more that a line long , so basically I'm trying to put some long description ",
      questions: [],
      createdOn: new Date('2023-12-28T09:59:19.609Z'),
    });
    this.surveyList.push({
      id: '50679706-bc05-4567-8c81-9d806d4f3d20',
      name: 'Survey 3',
      description: 'Awesome Description Here',
      questions: [],
      createdOn: new Date('2023-12-28T10:00:46.487Z'),
    });
    this.surveyList.push({
      id: '12243c27-7334-487a-8bb4-b92107441d69',
      name: 'New Survey',
      description: 'No More Description',
      questions: [],
      createdOn: new Date('2023-12-28T10:49:34.118Z'),
    });
  }
}
